"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scroller } from "./scroll";

export function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            anchors: { offset: 0 },
        });

        scroller.lenis = lenis;

        let frame = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);

        // Land on the right section when arriving from another page with a hash
        if (window.location.hash) {
            const el = document.querySelector(window.location.hash);
            if (el instanceof HTMLElement) lenis.scrollTo(el, { immediate: true });
        }

        return () => {
            cancelAnimationFrame(frame);
            scroller.lenis = null;
            lenis.destroy();
        };
    }, []);

    return null;
}
