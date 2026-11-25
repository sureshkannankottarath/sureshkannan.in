"use client";

import { useEffect, useRef } from "react";

/*
 * Two-part cursor: a precise dot and a trailing ring.
 * Any element with data-cursor="Label" grows the ring and shows the label.
 */
export function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const dot = dotRef.current!;
        const ring = ringRef.current!;
        const label = labelRef.current!;

        document.documentElement.classList.add("has-cursor");

        const pos = { x: -100, y: -100 };
        const trail = { x: -100, y: -100 };
        let scale = 1;
        let targetScale = 1;
        let visible = false;

        const onMove = (e: PointerEvent) => {
            pos.x = e.clientX;
            pos.y = e.clientY;
            if (!visible) {
                visible = true;
                trail.x = pos.x;
                trail.y = pos.y;
                dot.style.opacity = ring.style.opacity = "1";
            }
        };

        const onOver = (e: PointerEvent) => {
            const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, input, textarea");
            const text = target?.dataset.cursor ?? "";
            label.textContent = text;
            targetScale = text ? 4.2 : target ? 1.8 : 1;
            ring.dataset.mode = text ? "label" : target ? "link" : "";
        };

        const onLeave = () => {
            visible = false;
            dot.style.opacity = ring.style.opacity = "0";
        };

        let frame = 0;
        const loop = () => {
            trail.x += (pos.x - trail.x) * 0.18;
            trail.y += (pos.y - trail.y) * 0.18;
            scale += (targetScale - scale) * 0.2;
            dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
            ring.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) scale(${scale})`;
            label.style.transform = `scale(${1 / scale})`;
            frame = requestAnimationFrame(loop);
        };
        loop();

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerover", onOver);
        document.documentElement.addEventListener("pointerleave", onLeave);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerover", onOver);
            document.documentElement.removeEventListener("pointerleave", onLeave);
            document.documentElement.classList.remove("has-cursor");
        };
    }, []);

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden [@media(pointer:fine)]:block">
            <div
                ref={ringRef}
                className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-bone/40 opacity-0 transition-[background-color,border-color,opacity] duration-300 data-[mode=label]:border-transparent data-[mode=label]:bg-amber data-[mode=link]:border-amber"
            >
                <span ref={labelRef} className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.15em] text-ink" />
            </div>
            <div ref={dotRef} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-amber opacity-0 mix-blend-difference" />
        </div>
    );
}
