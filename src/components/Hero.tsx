"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { INTRO_DONE_EVENT, isIntroDone } from "./site/Preloader";
import { PORTRAIT_SRC, TAP_HOLD_MS } from "./gl/ParticleField";
import { profile } from "@/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

// Intrinsic size of the portrait PNG; keeps the lens and the particles aligned
const PORTRAIT_ASPECT = 682 / 1024;
const LENS_RADIUS = 110;

function useIntroDone() {
    const [done, setDone] = useState(false);
    useEffect(() => {
        if (isIntroDone()) {
            // Arrived after the intro already finished (client navigation)
            const id = requestAnimationFrame(() => setDone(true));
            return () => cancelAnimationFrame(id);
        }
        const onDone = () => setDone(true);
        window.addEventListener(INTRO_DONE_EVENT, onDone);
        return () => window.removeEventListener(INTRO_DONE_EVENT, onDone);
    }, []);
    return done;
}

function Line({ children, show, delay, className = "" }: { children: React.ReactNode; show: boolean; delay: number; className?: string }) {
    return (
        <span className={`block overflow-hidden ${className}`}>
            <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={show ? { y: "0%" } : undefined}
                transition={{ duration: 1.4, ease: EASE, delay }}
            >
                {children}
            </motion.span>
        </span>
    );
}

/*
 * The portrait itself is drawn by the particle field (it reads this box's position).
 * This layer holds the real photo, masked to a small lens that follows the cursor,
 * so hovering any part of the particle portrait reveals the photo underneath.
 */
function PortraitLens() {
    const boxRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const box = boxRef.current!;
        const photo = photoRef.current!;
        let tapTimer = 0;
        const place = (e: PointerEvent) => {
            const r = box.getBoundingClientRect();
            const w = Math.min(r.width, r.height * PORTRAIT_ASPECT);
            const h = w / PORTRAIT_ASPECT;
            const left = r.left + (r.width - w) / 2;
            photo.style.setProperty("--lx", `${e.clientX - r.left}px`);
            photo.style.setProperty("--ly", `${e.clientY - r.top}px`);
            return e.clientX >= left && e.clientX <= left + w && e.clientY >= r.bottom - h && e.clientY <= r.bottom;
        };
        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            photo.dataset.lens = place(e) ? "on" : "off";
        };
        // Touch: a tap on the portrait opens the lens there for a moment
        const onDown = (e: PointerEvent) => {
            if (e.pointerType === "mouse" || !place(e)) return;
            photo.dataset.lens = "on";
            window.clearTimeout(tapTimer);
            tapTimer = window.setTimeout(() => (photo.dataset.lens = "off"), TAP_HOLD_MS);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            window.clearTimeout(tapTimer);
        };
    }, []);

    return (
        <div ref={boxRef} data-gl-portrait-box data-gl-portrait-aspect={PORTRAIT_ASPECT} data-gl-lens={LENS_RADIUS} className="absolute inset-0">
            <div ref={photoRef} data-lens="off" className="portrait-lens absolute inset-0" style={{ ["--lens" as string]: `${LENS_RADIUS}px` }}>
                <Image
                    src={PORTRAIT_SRC}
                    alt="Portrait of Suresh Kannan"
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-contain object-bottom [filter:saturate(0.85)_contrast(1.05)_brightness(0.92)_sepia(0.1)]"
                />
            </div>
        </div>
    );
}

export function Hero() {
    const ref = useRef<HTMLElement>(null);
    const show = useIntroDone();
    const reduce = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
    const nameY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-25%"]);
    const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    const intro = (
        <>
            I turn ambiguous ideas into <em className="display-italic text-amber">shipped software</em>. Right now I lead the AI &amp; R&amp;D team at Poornam Info Vision.
        </>
    );

    return (
        <section
            ref={ref}
            data-gl-from="0"
            data-gl-x="0"
            data-gl-dim="1"
            data-gl-portrait="1"
            className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 md:px-10"
        >
            <motion.div
                className="eyebrow relative z-30 flex flex-wrap justify-between gap-4"
                initial={{ opacity: 0 }}
                animate={show ? { opacity: 1 } : undefined}
                transition={{ duration: 1, delay: 0.6 }}
            >
                <span>
                    {profile.role} · {profile.focus}
                </span>
                <span>Based in {profile.location.replace(", Kerala", "")}</span>
            </motion.div>

            <div className="relative grid flex-1 grid-cols-1 md:grid-cols-12">
                {/* Name and intro on the left */}
                <div className="relative z-20 flex flex-col justify-start pt-[5svh] md:col-span-7 md:justify-between md:pt-[9svh]">
                    <motion.h1 style={{ y: nameY, opacity: fade }} className="display select-none text-[23vw] leading-[0.82] md:text-[12.5vw]">
                        <Line show={show} delay={0.1} className="text-bone">
                            Suresh
                        </Line>
                        <Line show={show} delay={0.22} className="pl-[8vw] md:pl-[5vw]">
                            <span className="display-italic text-amber">Kannan</span>
                        </Line>
                    </motion.h1>

                    <div className="hidden md:block">
                        <motion.p
                            className="max-w-md text-lg leading-snug text-bone"
                            initial={{ opacity: 0, y: 20 }}
                            animate={show ? { opacity: 1, y: 0 } : undefined}
                            transition={{ duration: 1.2, ease: EASE, delay: 0.8 }}
                        >
                            {intro}
                        </motion.p>
                        <ScrollCue show={show} className="mt-10" />
                    </div>
                </div>

                {/* Particle portrait on the right (under the name on phones) */}
                <motion.div style={{ y: portraitY }} className="relative min-h-[46svh] md:col-span-5">
                    <div className="absolute inset-x-0 bottom-[-2rem] top-0 md:-top-16 md:bottom-[-2.5rem]">
                        <PortraitLens />
                    </div>
                </motion.div>
            </div>

            <span className="eyebrow relative z-30 mt-6 text-center [@media(pointer:fine)]:hidden">Tap the portrait to look closer</span>
            <p className="relative z-30 mt-6 text-base leading-snug text-bone md:hidden">{intro}</p>
        </section>
    );
}

function ScrollCue({ show, className = "" }: { show: boolean; className?: string }) {
    return (
        <motion.a
            href="#manifesto"
            data-cursor="Scroll"
            className={`eyebrow group flex items-center gap-4 ${className}`}
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: 1 }}
        >
            <span className="relative block h-10 w-px overflow-hidden bg-line">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-amber" />
            </span>
            Scroll to bring order
            <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
        </motion.a>
    );
}
