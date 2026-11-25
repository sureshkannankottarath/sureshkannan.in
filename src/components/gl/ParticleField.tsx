"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mulberry32, chaos, lattice, network, ring } from "./shapes";
import { glOverride, type GlTarget } from "./store";
import { samplePortrait } from "./portrait";

/*
 * Full-viewport particle field that sits behind the page.
 *
 * Sections steer it declaratively with data attributes:
 *   data-gl-from / data-gl-to  formation range across the section's scroll (0 chaos … 3 ring)
 *   data-gl-x                  horizontal offset of the formation (world units)
 *   data-gl-dim                brightness multiplier (0–1)
 *   data-gl-portrait           1 = particles assemble into the portrait inside
 *                              the [data-gl-portrait-box] element
 * The section containing the viewport centre wins.
 */

export const PORTRAIT_SRC = "/images/latest_me.png";

// How long a tap keeps the portrait lens open on touch screens
export const TAP_HOLD_MS = 2500;

// Share of particles that stay as ambient dust instead of joining the portrait
const DUST = 0.16;

const vertexShader = /* glsl */ `
  attribute vec3 aPos0;
  attribute vec3 aPos1;
  attribute vec3 aPos2;
  attribute vec3 aPos3;
  attribute vec4 aRandom;
  attribute vec2 aUV;
  attribute vec3 aColor;

  uniform float uShape;
  uniform float uPortrait;
  uniform vec4 uRect;        // portrait centre xy + size wh, in view space at the z=0 plane
  uniform float uCamZ;
  uniform float uPortraitSize;
  uniform vec2 uViewport;
  uniform float uMouseRadius; // px
  uniform float uPush;        // view units
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uMouseStrength;

  varying float vAlpha;
  varying float vTone;
  varying float vPortrait;
  varying vec3 vColor;

  vec3 pick(int i) {
    if (i == 0) return aPos0;
    if (i == 1) return aPos1;
    if (i == 2) return aPos2;
    return aPos3;
  }

  void main() {
    float s = clamp(uShape, 0.0, 3.0);
    int seg = int(min(floor(s), 2.0));
    float f = s - float(seg);

    // Stagger each particle's departure so formations dissolve and assemble organically
    float delay = aRandom.x * 0.35;
    float t = smoothstep(0.0, 1.0, clamp((f - delay) / 0.65, 0.0, 1.0));

    vec3 pos = mix(pick(seg), pick(seg + 1), t);

    // Turbulence: strong in chaos, swells mid-transition, settles in structured forms
    float chaosAmt = 1.0 - smoothstep(0.0, 0.6, s);
    float travel = sin(t * 3.14159);
    float amp = 0.015 + chaosAmt * 0.22 + travel * 0.35;
    float tt = uTime * (0.25 + aRandom.y * 0.35);
    pos += vec3(
      sin(tt + pos.y * 1.7 + aRandom.z * 6.28),
      cos(tt * 0.9 + pos.z * 1.3 + aRandom.w * 6.28),
      sin(tt * 1.1 + pos.x * 1.5 + aRandom.y * 6.28)
    ) * amp;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);

    // Portrait: placed directly in view space so it lines up with its DOM box
    float joins = step(${DUST.toFixed(2)}, aRandom.y);
    float pt = smoothstep(0.0, 1.0, clamp((uPortrait - aRandom.x * 0.4) / 0.6, 0.0, 1.0)) * joins;
    vec4 mvPortrait = vec4(uRect.xy + aUV * uRect.zw, -uCamZ + (aRandom.z - 0.5) * 0.04, 1.0);
    mvPortrait.xy += vec2(sin(uTime * 0.8 + aRandom.w * 6.28), cos(uTime * 0.7 + aRandom.z * 6.28)) * 0.004;
    mv = mix(mv, mvPortrait, pt);

    // Push particles away from the cursor (in pixels, so the hole is round)
    vec4 clip = projectionMatrix * mv;
    vec2 px = (clip.xy / clip.w - uMouse) * uViewport * 0.5;
    float push = smoothstep(uMouseRadius, uMouseRadius * 0.35, length(px)) * uMouseStrength;
    mv.xy += normalize(px + 1e-5) * push * uPush;

    gl_Position = projectionMatrix * mv;
    float fieldSize = uSize * (0.45 + aRandom.z * 0.9) * uPixelRatio * (1.0 / -mv.z);
    gl_PointSize = mix(fieldSize, uPortraitSize * uPixelRatio * (0.8 + aRandom.z * 0.4), pt);

    vAlpha = mix(smoothstep(14.0, 4.0, -mv.z) * (0.35 + aRandom.y * 0.65), 0.62, pt);
    vTone = aRandom.w;
    vPortrait = pt;
    vColor = aColor;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uAmber;
  uniform vec3 uBone;
  uniform vec3 uEmber;
  uniform float uDim;

  varying float vAlpha;
  varying float vTone;
  varying float vPortrait;
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float core = pow(1.0 - d * 2.0, mix(2.2, 1.4, vPortrait));

    vec3 field = vTone < 0.12 ? uEmber : mix(uAmber, uBone, smoothstep(0.2, 1.0, vTone));
    // Photo colour, warmed slightly toward the palette
    vec3 photo = vColor * vec3(1.0, 0.9, 0.78);
    gl_FragColor = vec4(mix(field, photo, vPortrait), core * vAlpha * uDim);
  }
`;


/*
 * Splits progress p (0–1) into `segments + 1` equal bands. Each band holds a whole
 * formation and only morphs to the next in its last quarter, so a pinned section
 * can rest on each formation while its copy is read.
 */
export function steppedProgress(p: number, segments: number) {
    const bands = segments + 1;
    const x = Math.min(p * bands, bands - 1e-6);
    const i = Math.floor(x);
    if (i >= segments) return segments;
    const f = x - i;
    const t = Math.min(Math.max((f - 0.72) / 0.28, 0), 1);
    return i + t * t * (3 - 2 * t);
}

function readTarget(): GlTarget | null {
    if (glOverride.current) return glOverride.current;
    const vh = window.innerHeight;
    const centre = vh / 2;
    const sections = document.querySelectorAll<HTMLElement>("[data-gl-from]");
    for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= centre && rect.bottom >= centre) {
            const from = parseFloat(el.dataset.glFrom ?? "0");
            const to = parseFloat(el.dataset.glTo ?? String(from));
            const scrollable = Math.max(rect.height - vh, 1);
            const p = Math.min(Math.max(-rect.top / scrollable, 0), 1);
            return {
                shape: el.dataset.glSteps !== undefined ? from + steppedProgress(p, to - from) : from + (to - from) * p,
                x: parseFloat(el.dataset.glX ?? "0"),
                dim: parseFloat(el.dataset.glDim ?? "1"),
                portrait: parseFloat(el.dataset.glPortrait ?? "0"),
            };
        }
    }
    return null;
}

export function ParticleField() {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
        } catch {
            // No WebGL: the CSS background carries the page, and the portrait shows as a plain photo
            document.documentElement.dataset.gl = "off";
            return;
        }

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isSmall = window.innerWidth < 768;
        const count = isSmall ? 6000 : 14000;

        const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
        camera.position.set(0, 0, isSmall ? 9.5 : 7.5);

        const rand = mulberry32(369);
        const geometry = new THREE.BufferGeometry();
        const p0 = chaos(count, rand);
        geometry.setAttribute("position", new THREE.BufferAttribute(p0, 3));
        geometry.setAttribute("aPos0", new THREE.BufferAttribute(p0, 3));
        geometry.setAttribute("aPos1", new THREE.BufferAttribute(lattice(count, rand), 3));
        geometry.setAttribute("aPos2", new THREE.BufferAttribute(network(count, rand), 3));
        geometry.setAttribute("aPos3", new THREE.BufferAttribute(ring(count, rand), 3));
        const randoms = new Float32Array(count * 4);
        for (let i = 0; i < randoms.length; i++) randoms[i] = rand();
        geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 4));
        const uvAttr = new THREE.BufferAttribute(new Float32Array(count * 2), 2);
        const colorAttr = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
        geometry.setAttribute("aUV", uvAttr);
        geometry.setAttribute("aColor", colorAttr);

        let portraitCoverage = 0;
        let disposed = false;
        samplePortrait(PORTRAIT_SRC, count, mulberry32(7))
            .then((sample) => {
                if (disposed) return;
                uvAttr.set(sample.uv);
                colorAttr.set(sample.color);
                uvAttr.needsUpdate = colorAttr.needsUpdate = true;
                portraitCoverage = sample.coverage;
            })
            .catch(() => {
                // Leave the portrait formation disabled; the field still works
            });
        // Particles move far from their base positions in the shader; never cull
        geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100);

        const uniforms = {
            uShape: { value: 0 },
            uTime: { value: 0 },
            uSize: { value: isSmall ? 60 : 72 },
            uPixelRatio: { value: pixelRatio },
            uMouse: { value: new THREE.Vector2(10, 10) },
            uMouseStrength: { value: 0 },
            uMouseRadius: { value: 260 },
            uPush: { value: 0.6 },
            uViewport: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uPortrait: { value: 0 },
            uRect: { value: new THREE.Vector4() },
            uCamZ: { value: camera.position.z },
            uPortraitSize: { value: 4 },
            uDim: { value: 0 },
            uAmber: { value: new THREE.Color("#E8A23A") },
            uBone: { value: new THREE.Color("#F2E8D5") },
            uEmber: { value: new THREE.Color("#D2542A") },
        };

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geometry, material);
        const group = new THREE.Group();
        group.add(points);
        scene.add(group);

        // Eased state
        const current = { shape: 0, x: 0, dim: 0, portrait: 0, mouseX: 0, mouseY: 0, strength: 0 };
        const target = { shape: 0, x: 0, dim: 1, portrait: 0, mouseX: 0, mouseY: 0, strength: 0 };

        const onPointer = (e: PointerEvent) => {
            target.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            target.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            if (e.pointerType === "mouse") target.strength = 1;
        };
        const onLeave = () => (target.strength = 0);
        // Touch has no hover: a tap pushes particles aside briefly (pairs with the portrait lens)
        let tapTimer = 0;
        const onDown = (e: PointerEvent) => {
            if (e.pointerType === "mouse") return;
            target.mouseX = current.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            target.mouseY = current.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            target.strength = 1;
            window.clearTimeout(tapTimer);
            tapTimer = window.setTimeout(() => (target.strength = 0), TAP_HOLD_MS);
        };

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.position.z = window.innerWidth < 768 ? 9.5 : 7.5;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.uViewport.value.set(window.innerWidth, window.innerHeight);
            uniforms.uCamZ.value = camera.position.z;
        };

        // Maps the portrait box (where the photo is drawn, object-contain + bottom) into view space
        const placePortrait = () => {
            const box = document.querySelector<HTMLElement>("[data-gl-portrait-box]");
            if (!box || !portraitCoverage) return false;
            const r = box.getBoundingClientRect();
            const aspect = Number(box.dataset.glPortraitAspect ?? "1");
            const w = Math.min(r.width, r.height * aspect);
            const h = w / aspect;
            const cx = r.left + r.width / 2;
            const cy = r.bottom - h / 2;
            const worldPerPx = (2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / window.innerHeight;
            uniforms.uRect.value.set((cx - window.innerWidth / 2) * worldPerPx, (window.innerHeight / 2 - cy) * worldPerPx, w * worldPerPx, h * worldPerPx);
            // Points just large enough to close the gaps between neighbours
            const spacing = Math.sqrt((w * h * portraitCoverage) / (count * (1 - DUST)));
            uniforms.uPortraitSize.value = spacing * 1.9;
            const lens = Number(box.dataset.glLens ?? "110");
            uniforms.uMouseRadius.value = THREE.MathUtils.lerp(260, lens * 1.15, current.portrait);
            uniforms.uPush.value = THREE.MathUtils.lerp(0.6, lens * worldPerPx * 0.9, current.portrait);
            return true;
        };

        window.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        window.addEventListener("resize", onResize);

        const clock = new THREE.Clock();
        let frame = 0;

        const tick = () => {
            frame = requestAnimationFrame(tick);
            if (document.hidden) return;

            const dt = Math.min(clock.getDelta(), 0.05);
            const elapsed = clock.elapsedTime;

            const next = readTarget();
            if (next) {
                target.shape = next.shape;
                // Offsets are designed for wide screens; on narrow ones the formation
                // sits behind the copy instead, so it is dimmed to keep text legible
                const narrow = window.innerWidth < 1024;
                target.x = narrow ? 0 : next.x;
                target.dim = narrow && next.x !== 0 ? next.dim * 0.5 : next.dim;
                target.portrait = next.portrait ?? 0;
            }
            const hasPortrait = placePortrait();
            if (!hasPortrait) target.portrait = 0;

            const ease = reduceMotion ? 1 : 1 - Math.pow(0.001, dt);
            current.shape += (target.shape - current.shape) * ease;
            current.x += (target.x - current.x) * ease * 0.8;
            current.dim += (target.dim - current.dim) * (1 - Math.pow(0.02, dt));
            current.portrait += (target.portrait - current.portrait) * (reduceMotion ? 1 : 1 - Math.pow(0.04, dt));
            current.mouseX += (target.mouseX - current.mouseX) * (1 - Math.pow(0.0005, dt));
            current.mouseY += (target.mouseY - current.mouseY) * (1 - Math.pow(0.0005, dt));
            current.strength += (target.strength - current.strength) * (1 - Math.pow(0.01, dt));

            uniforms.uShape.value = current.shape;
            uniforms.uTime.value = reduceMotion ? 0 : elapsed;
            uniforms.uDim.value = current.dim;
            uniforms.uPortrait.value = current.portrait;
            uniforms.uMouse.value.set(current.mouseX, current.mouseY);
            uniforms.uMouseStrength.value = current.strength;

            group.position.x = current.x;
            if (!reduceMotion) {
                group.rotation.y = elapsed * 0.06 + current.mouseX * 0.25;
                group.rotation.x = 0.35 + current.mouseY * -0.15 + Math.sin(elapsed * 0.1) * 0.05;
            }

            renderer.render(scene, camera);
        };
        tick();

        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", onPointer);
            window.removeEventListener("pointerdown", onDown);
            window.clearTimeout(tapTimer);
            document.documentElement.removeEventListener("pointerleave", onLeave);
            window.removeEventListener("resize", onResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);

    return <div ref={hostRef} aria-hidden className="gl-host pointer-events-none fixed inset-0 z-0" />;
}
