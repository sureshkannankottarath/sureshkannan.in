"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, type MotionValue } from "framer-motion";
import { Reveal, Rule } from "./ui/Reveal";
import { stats, education } from "@/data/profile";

const MANIFESTO =
    "Great products rarely start clear. They start as noise: half-formed ideas, competing priorities, a deadline. For 8+ years I've led the teams that turn that noise into structure, and structure into software people rely on. Now I do it with AI, where the noise is louder and the opportunity bigger.";

// Words light up one by one as the paragraph scrolls through the viewport
function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.14, 1]);
    const highlight = /noise|structure|software|AI/.test(word);
    return (
        <motion.span style={{ opacity }} className={highlight ? "display-italic text-amber" : ""}>
            {word}{" "}
        </motion.span>
    );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-20% 0px" });
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let frame = 0;
        const start = performance.now();
        const step = (now: number) => {
            const t = Math.min((now - start) / 1600, 1);
            setN(Math.round(value * (1 - Math.pow(1 - t, 4))));
            if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [inView, value]);

    return (
        <span ref={ref}>
            {String(n).padStart(2, "0")}
            <span className="text-amber">{suffix}</span>
        </span>
    );
}

export function About() {
    const textRef = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.85", "end 0.45"] });
    const words = MANIFESTO.split(" ");

    return (
        <section id="manifesto" data-gl-from="0" data-gl-dim="0.45" className="relative px-5 py-32 md:px-10 md:py-48">
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-14 grid gap-6 md:grid-cols-12">
                    <span className="eyebrow md:col-span-3">(01) Manifesto</span>
                </div>

                <p ref={textRef} className="display text-[9vw] leading-[1.02] tracking-[-0.03em] md:col-span-10 md:text-[4.6vw]">
                    {words.map((w, i) => (
                        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
                    ))}
                </p>

                <Rule className="mt-24" />
                <div className="grid grid-cols-1 gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((s, i) => (
                        <Reveal key={s.label} delay={i * 0.1} className="flex flex-col gap-3">
                            <span className="display text-7xl text-bone md:text-8xl">
                                <Counter value={s.value} suffix={s.suffix} />
                            </span>
                            <span className="eyebrow">{s.label}</span>
                        </Reveal>
                    ))}
                    <Reveal delay={0.3} className="flex flex-col justify-end gap-2 border-l border-line pl-6">
                        <span className="eyebrow">Education</span>
                        <span className="text-bone">{education.degree}</span>
                        <span className="text-sm text-bone-dim">
                            {education.school}, {education.years}
                        </span>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
