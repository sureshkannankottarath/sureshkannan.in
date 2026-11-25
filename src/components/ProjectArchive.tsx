"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./Projects";
import { SplitReveal, Reveal, Rule } from "./ui/Reveal";

const ALL = "All";

export function ProjectArchive({ projects }: { projects: Project[] }) {
    const categories = useMemo(() => [ALL, ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
    const [filter, setFilter] = useState(ALL);
    const [query, setQuery] = useState("");

    const visible = projects.filter((p) => {
        const q = query.trim().toLowerCase();
        const matchesQuery = !q || [p.title, p.description, ...p.tags].some((s) => s.toLowerCase().includes(q));
        return (filter === ALL || p.category === filter) && matchesQuery;
    });

    return (
        <section data-gl-from="2" data-gl-dim="0.35" className="relative min-h-[100svh] px-5 pb-32 pt-36 md:px-10 md:pt-48">
            <div className="mx-auto max-w-[1600px]">
                <span className="eyebrow mb-6 block">Selected projects</span>
                <h1 className="display text-[17vw] leading-[0.85] md:text-[11vw]">
                    <SplitReveal text="The work" immediate className="block" />
                    <SplitReveal text="so far." immediate delay={0.12} className="display-italic block text-amber" />
                </h1>

                <Reveal delay={0.3} className="mt-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
                        {categories.map((c) => (
                            <button
                                key={c}
                                role="tab"
                                aria-selected={filter === c}
                                onClick={() => setFilter(c)}
                                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${filter === c ? "border-amber bg-amber text-ink" : "border-line text-bone hover:border-bone-dim"}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                    <label className="flex items-center gap-3 border-b border-line pb-2 md:w-80">
                        <span className="eyebrow">Search</span>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="title, tag, stack…"
                            className="w-full bg-transparent text-bone placeholder:text-mute focus:outline-none"
                        />
                    </label>
                </Reveal>

                <Rule className="mt-10" />

                <motion.div layout className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {visible.map((p, i) => (
                            <motion.div
                                key={p.slug}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 8) * 0.04 }}
                            >
                                <Link href={`/projects/${p.slug}`} data-cursor="View" className="group block">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ink-3">
                                        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105">
                                            <ProjectVisual project={p} sizes="(max-width: 768px) 100vw, 33vw" />
                                        </div>
                                    </div>
                                    <div className="mt-5 flex items-baseline justify-between gap-4">
                                        <h2 className="display text-3xl transition-colors group-hover:text-amber md:text-4xl">{p.title}</h2>
                                        <span className="eyebrow shrink-0">{p.category}</span>
                                    </div>
                                    <p className="mt-3 line-clamp-2 text-bone-dim">{p.description}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {visible.length === 0 && (
                    <p className="display-italic py-24 text-center text-3xl text-bone-dim">Nothing matches “{query}” yet.</p>
                )}
            </div>
        </section>
    );
}
