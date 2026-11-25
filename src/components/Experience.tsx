"use client";

import { experience, toolkit } from "@/data/profile";
import { Reveal, SplitReveal, Rule } from "./ui/Reveal";

export function Experience() {
    return (
        <section id="experience" data-gl-from="1" data-gl-dim="0.28" className="relative px-5 py-32 md:px-10 md:py-44">
            <div className="mx-auto max-w-[1600px]">
                <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <span className="eyebrow mb-6 block">(04) Career</span>
                            <SplitReveal as="h2" text="Eight years, one craft" className="display text-[14vw] lg:text-[5.6vw]" />
                            <Reveal delay={0.2} className="mt-8 max-w-xs text-bone-dim">
                                From writing PHP to leading an AI &amp; R&amp;D team, every role has been about the same thing: getting the right thing built, well, on time.
                            </Reveal>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        {experience.map((job, i) => (
                            <article key={job.company} className="group">
                                <Rule delay={i * 0.1} />
                                <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-8 md:py-14">
                                    <Reveal className="md:col-span-3">
                                        <span className="font-mono text-sm text-amber">{job.years}</span>
                                        <h3 className="display mt-3 text-4xl transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:text-5xl">
                                            {job.company}
                                        </h3>
                                        <span className="eyebrow mt-3 block">{job.place}</span>
                                    </Reveal>
                                    <div className="flex flex-col gap-10 md:col-span-5">
                                        {job.roles.map((role, j) => (
                                            <Reveal key={role.title} delay={0.1 + j * 0.1}>
                                                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                                                    <h4 className="text-xl text-bone">{role.title}</h4>
                                                    <span className="eyebrow">{role.period}</span>
                                                </div>
                                                <ul className="flex flex-col gap-3">
                                                    {role.points.map((pt) => (
                                                        <li key={pt} className="flex gap-3 leading-relaxed text-bone-dim">
                                                            <span className="mt-[0.7em] h-px w-4 shrink-0 bg-amber/70" />
                                                            {pt}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Reveal>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                        <Rule />
                    </div>
                </div>
            </div>
        </section>
    );
}

function MarqueeRow({ items, reverse = false, duration }: { items: string[]; reverse?: boolean; duration: number }) {
    // Rendered twice so the -50% translate loops seamlessly
    const run = [...items, ...items];
    return (
        <div className="flex overflow-hidden whitespace-nowrap [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee-track flex shrink-0 items-center" data-reverse={reverse ? "" : undefined} style={{ ["--marquee-duration" as string]: `${duration}s` }}>
                {run.map((item, i) => (
                    <span key={i} className="flex items-center">
                        <span className={`display px-6 text-[11vw] leading-none md:px-10 md:text-[6vw] ${i % 2 ? "display-italic text-outline" : "text-bone"}`}>{item}</span>
                        <span className="text-2xl text-amber md:text-4xl">✳</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

export function Toolkit() {
    return (
        <section aria-label="Toolkit" data-gl-from="2" data-gl-dim="0.35" className="relative overflow-hidden py-24 md:py-36">
            <div className="mx-auto mb-12 flex max-w-[1600px] justify-between px-5 md:px-10">
                <span className="eyebrow">(05) Toolkit</span>
                <span className="eyebrow hidden md:inline">Process · AI · Engineering</span>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
                <MarqueeRow items={toolkit[0]} duration={60} />
                <MarqueeRow items={toolkit[1]} duration={70} reverse />
            </div>
        </section>
    );
}
