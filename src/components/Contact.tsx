"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { profile } from "@/data/profile";
import { SplitReveal, Reveal, Rule } from "./ui/Reveal";
import { LocalTime } from "./site/LocalTime";

// Big round button that leans toward the cursor
function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15 });
    const sy = useSpring(y, { stiffness: 200, damping: 15 });

    return (
        <motion.a
            ref={ref}
            href={href}
            data-cursor="Write"
            style={{ x: sx, y: sy }}
            onPointerMove={(e) => {
                const r = ref.current!.getBoundingClientRect();
                x.set((e.clientX - r.left - r.width / 2) * 0.35);
                y.set((e.clientY - r.top - r.height / 2) * 0.35);
            }}
            onPointerLeave={() => {
                x.set(0);
                y.set(0);
            }}
            className="group relative grid h-40 w-40 shrink-0 place-items-center overflow-hidden rounded-full bg-amber text-ink md:h-52 md:w-52"
        >
            <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
            <span className="relative font-mono text-xs uppercase tracking-[0.2em]">{children}</span>
        </motion.a>
    );
}

export function Contact() {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${profile.email}`;
        }
    };

    return (
        <footer id="contact" data-gl-from="3" data-gl-x="2.4" data-gl-dim="0.85" className="relative z-10 flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-32 md:px-10">
            <div className="mx-auto w-full max-w-[1600px]">
                <span className="eyebrow mb-10 block">(06) Contact</span>
                <h2 className="display text-[16vw] leading-[0.85] md:text-[10.5vw]">
                    <SplitReveal text="Let’s build" className="block" />
                    <SplitReveal text="what’s next." className="display-italic block text-amber" delay={0.15} />
                </h2>

                <div className="mt-16 flex flex-col items-start gap-12 md:flex-row md:items-center md:justify-between">
                    <Reveal className="max-w-md">
                        <p className="text-lg leading-relaxed text-bone-dim md:text-xl">
                            Have an AI product to ship, a process to automate, or a team that needs a steady hand? I’d love to hear about it.
                        </p>
                        <button onClick={copy} data-cursor={copied ? "Copied" : "Copy"} className="group mt-8 flex items-center gap-4 text-left">
                            <span className="display-italic text-2xl text-bone transition-colors group-hover:text-amber md:text-4xl">{profile.email}</span>
                            <span className="eyebrow">{copied ? "Copied ✓" : "Copy"}</span>
                        </button>
                    </Reveal>
                    <MagneticButton href={`mailto:${profile.email}`}>Say hello</MagneticButton>
                </div>
            </div>

            <div className="mx-auto mt-24 w-full max-w-[1600px]">
                <Rule className="mb-6" />
                <div className="eyebrow flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <span>© {new Date().getFullYear()} {profile.name}</span>
                    <span>
                        {profile.location} · <LocalTime />
                    </span>
                    <nav className="flex gap-6">
                        {profile.socials.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="!text-bone transition-colors hover:!text-amber">
                                {s.label} ↗
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
