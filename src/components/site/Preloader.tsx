"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEEN_KEY = "sk-intro-seen";

export const INTRO_DONE_EVENT = "sk:intro-done";

export function isIntroDone() {
    return typeof document !== "undefined" && document.documentElement.dataset.intro === "done";
}

function finishIntro() {
    document.documentElement.dataset.intro = "done";
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

// Counts to 100 once per session, then lifts like a curtain
export function Preloader() {
    const [visible, setVisible] = useState(true);
    const countRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let seen = false;
        try {
            seen = sessionStorage.getItem(SEEN_KEY) === "1";
            sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
            // Storage blocked: just play the intro
        }
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const duration = seen || reduce ? 0 : 1700;

        let frame = 0;
        const start = performance.now();
        const step = (now: number) => {
            const t = duration ? Math.min((now - start) / duration, 1) : 1;
            // Ease-in-out so the count lingers before 100
            const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
            if (t < 1) {
                frame = requestAnimationFrame(step);
            } else {
                setVisible(false);
                finishIntro();
            }
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink px-5 py-6 md:px-10 md:py-8"
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    initial={{ clipPath: "inset(0 0 0% 0)" }}
                    transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="eyebrow flex justify-between">
                        <span>Suresh Kannan</span>
                        <span>Portfolio {new Date().getFullYear()}</span>
                    </div>
                    <div className="flex items-end justify-between gap-6">
                        <p className="display-italic max-w-xs text-2xl text-bone-dim md:text-3xl">bringing order to the noise…</p>
                        <span ref={countRef} className="display text-[22vw] leading-none text-bone md:text-[12rem]">
                            000
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
