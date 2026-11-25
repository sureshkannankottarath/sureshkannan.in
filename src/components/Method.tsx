"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { method } from "@/data/profile";
import { steppedProgress } from "./gl/ParticleField";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
 * Pinned for several viewports. The particle field (data-gl-*) morphs
 * chaos → lattice → network in step with the three stages shown here.
 */
export function Method() {
    const ref = useRef<HTMLElement>(null);
    const [stage, setStage] = useState(0);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        setStage(Math.round(steppedProgress(p, method.length - 1)));
    });

    const current = method[stage];

    return (
        <section
            id="method"
            ref={ref}
            data-gl-from="0"
            data-gl-to={String(method.length - 1)}
            data-gl-steps=""
            data-gl-x="1.9"
            data-gl-dim="1"
            className="relative h-[340vh]"
        >
            <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden px-5 pb-10 pt-28 md:px-10">
                <div className="mx-auto flex w-full max-w-[1600px] items-start justify-between">
                    <span className="eyebrow">(02) Method</span>
                    <span className="eyebrow hidden md:inline">Chaos → Structure → Delivery</span>
                </div>

                <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-6">
                        <div className="mb-8 flex items-baseline gap-4">
                            <span className="display text-6xl text-amber md:text-7xl">{current.index}</span>
                            <span className="eyebrow">/ 0{method.length}</span>
                        </div>

                        <div className="relative min-h-[46svh] md:min-h-[40svh]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={stage}
                                    initial="hide"
                                    animate="show"
                                    exit="leave"
                                    className="absolute inset-0"
                                >
                                    <h2 className="display mb-8 text-[13vw] leading-[0.9] md:text-[6.5vw]">
                                        {current.title.split(" ").map((w, i) => (
                                            <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                                                <motion.span
                                                    className={`inline-block ${i === current.title.split(" ").length - 1 ? "display-italic text-amber" : ""}`}
                                                    variants={{
                                                        hide: { y: "110%" },
                                                        show: { y: "0%", transition: { duration: 1, ease: EASE, delay: i * 0.07 } },
                                                        leave: { y: "-110%", transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } },
                                                    }}
                                                >
                                                    {w}&nbsp;
                                                </motion.span>
                                            </span>
                                        ))}
                                    </h2>
                                    <motion.p
                                        className="max-w-md text-lg leading-relaxed text-bone-dim md:text-xl"
                                        variants={{
                                            hide: { opacity: 0, y: 20 },
                                            show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.25 } },
                                            leave: { opacity: 0, transition: { duration: 0.3 } },
                                        }}
                                    >
                                        {current.body}
                                    </motion.p>
                                    <motion.ul
                                        className="mt-8 flex max-w-md flex-wrap gap-2"
                                        variants={{
                                            show: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
                                            leave: { opacity: 0, transition: { duration: 0.3 } },
                                        }}
                                    >
                                        {current.tools.map((t) => (
                                            <motion.li
                                                key={t}
                                                variants={{ hide: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                                                className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-bone"
                                            >
                                                {t}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Stage rail */}
                <div className="mx-auto w-full max-w-[1600px]">
                    <div className="relative mb-4 h-px bg-line">
                        <motion.div style={{ width: bar }} className="absolute inset-y-0 left-0 bg-amber" />
                    </div>
                    <ol className="grid grid-cols-3 gap-4">
                        {method.map((m, i) => (
                            <li key={m.index} className={`eyebrow transition-colors duration-500 ${i === stage ? "!text-bone" : ""}`}>
                                {m.index} <span className="hidden sm:inline">{m.title}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
