"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { getProxiedImage } from "@/lib/image";
import type { Project } from "@/data/projects";
import { Reveal, SplitReveal, Rule } from "./ui/Reveal";

// Stand-in artwork for projects without a screenshot: a typographic plate
export function ProjectPlate({ project, className = "" }: { project: Project; className?: string }) {
    return (
        <div className={`@container relative h-full w-full overflow-hidden bg-ink-3 ${className}`}>
            <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_85%_10%,rgba(232,162,58,0.55),transparent_60%),radial-gradient(60%_60%_at_0%_100%,rgba(210,84,42,0.35),transparent_65%)]" />
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(242,232,213,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(242,232,213,0.1)_1px,transparent_1px)] [background-size:6cqw_6cqw]" />
            {/* Orbit motif echoing the WebGL ring */}
            <div className="absolute right-[-12cqw] top-[-18cqw] aspect-square w-[62cqw] rounded-full border border-bone/25" />
            <div className="absolute right-[-2cqw] top-[-8cqw] aspect-square w-[42cqw] rounded-full border border-bone/15" />
            <span className="eyebrow absolute left-[5cqw] top-[5cqw] !text-[max(0.55rem,2cqw)] !text-bone">{project.category}</span>
            <span className="display-italic absolute inset-x-[5cqw] bottom-[4cqw] text-[12cqw] leading-[0.9] text-bone">{project.title}</span>
        </div>
    );
}

export function ProjectVisual({ project, sizes, priority = false }: { project: Project; sizes: string; priority?: boolean }) {
    if (!project.image) return <ProjectPlate project={project} />;
    return <Image src={getProxiedImage(project.image)} alt={project.title} fill sizes={sizes} priority={priority} className="object-cover object-top" />;
}

// Floating preview that trails the cursor over the list (desktop only)
function HoverPreview({ project }: { project: Project | null }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
    const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [x, y]);

    return (
        <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(pointer:fine)]:block">
            <AnimatePresence>
                {project && (
                    <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, scale: 0.85, rotate: -4, clipPath: "inset(50% 0 50% 0)" }}
                        animate={{ opacity: 1, scale: 1, rotate: 0, clipPath: "inset(0% 0 0% 0)" }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative ml-8 -mt-36 aspect-[4/3] w-[24rem] overflow-hidden rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                    >
                        <ProjectVisual project={project} sizes="384px" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function ProjectRow({ project, index, onHover }: { project: Project; index: number; onHover?: (p: Project | null) => void }) {
    return (
        <Reveal delay={Math.min(index, 6) * 0.05}>
            <Link
                href={`/projects/${project.slug}`}
                data-cursor="View"
                onPointerEnter={() => onHover?.(project)}
                onPointerLeave={() => onHover?.(null)}
                className="group relative grid grid-cols-12 items-baseline gap-4 border-b border-line py-7 md:py-9"
            >
                {/* Amber wash that rises on hover */}
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-amber/[0.06] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
                <span className="eyebrow relative col-span-2 md:col-span-1">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="display relative col-span-10 text-[11vw] leading-[0.95] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4 md:col-span-6 md:text-[4.4vw]">
                    <span className="transition-colors duration-500 group-hover:text-amber">{project.title}</span>
                </h3>
                <span className="relative col-span-6 col-start-3 text-sm text-bone-dim md:col-span-3 md:col-start-auto">
                    {project.tags.slice(0, 3).join(" · ")}
                </span>
                <span className="eyebrow relative col-span-4 flex items-center justify-end gap-3 md:col-span-2">
                    {project.category}
                    <svg className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </span>
            </Link>
        </Reveal>
    );
}

export function Projects({ projects }: { projects: Project[] }) {
    const [hovered, setHovered] = useState<Project | null>(null);

    return (
        <section id="work" data-gl-from="2" data-gl-dim="0.3" className="relative px-5 py-32 md:px-10 md:py-44">
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
                    <div>
                        <span className="eyebrow mb-6 block">(03) Selected work</span>
                        <SplitReveal as="h2" text="Things I’ve shipped" className="display text-[14vw] md:text-[8vw]" />
                    </div>
                    <Reveal className="max-w-sm text-bone-dim">
                        AI products, platforms and the projects that taught me how to deliver them, from LIMS and fintech to retrieval-augmented support tools.
                    </Reveal>
                </div>

                <Rule />
                <div>
                    {projects.map((p, i) => (
                        <ProjectRow key={p.slug} project={p} index={i} onHover={setHovered} />
                    ))}
                </div>

                <Reveal className="mt-16 flex justify-center">
                    <Link href="/projects" data-cursor="Open" className="group inline-flex items-center gap-5 text-bone">
                        <span className="display-italic text-4xl transition-colors group-hover:text-amber md:text-5xl">Full archive</span>
                        <span className="grid h-14 w-14 place-items-center rounded-full border border-line transition-colors group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </span>
                    </Link>
                </Reveal>
            </div>
            <HoverPreview project={hovered} />
        </section>
    );
}
