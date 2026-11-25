"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Each word slides up from behind a mask, staggered
export function SplitReveal({
    text,
    as: Tag = "span",
    className = "",
    delay = 0,
    stagger = 0.06,
    immediate = false,
}: {
    text: string;
    as?: ElementType;
    className?: string;
    delay?: number;
    stagger?: number;
    immediate?: boolean;
}) {
    const reduce = useReducedMotion();
    const words = text.split(" ");
    const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } };

    return (
        <Tag className={className} aria-label={text}>
            <motion.span initial={reduce ? "show" : "hide"} {...trigger} aria-hidden className="inline">
                {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                        <motion.span
                            className="inline-block"
                            variants={{
                                hide: { y: "110%", rotate: 4 },
                                show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE, delay: delay + i * stagger } },
                            }}
                        >
                            {word}
                            {i < words.length - 1 ? " " : ""}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Tag>
    );
}

// Fade + lift for blocks
export function Reveal({ children, className = "", delay = 0, y = 40 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, ease: EASE, delay }}
        >
            {children}
        </motion.div>
    );
}

// A hairline that draws itself across
export function Rule({ className = "", delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.div
            className={`h-px origin-left bg-line ${className}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE, delay }}
        />
    );
}
