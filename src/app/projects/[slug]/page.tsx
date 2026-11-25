import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/site/Shell";
import { ProjectVisual } from "@/components/Projects";
import { SplitReveal, Reveal, Rule } from "@/components/ui/Reveal";
import { projectsData } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { slug } = await props.params;
    const project = projectsData.find((p) => p.slug === slug);
    if (!project) return {};
    return { title: `${project.title} | Suresh Kannan`, description: project.description };
}

export default async function ProjectPage(props: Props) {
    const { slug } = await props.params;
    const index = projectsData.findIndex((p) => p.slug === slug);
    if (index === -1) notFound();

    const project = projectsData[index];
    const next = projectsData[(index + 1) % projectsData.length];

    return (
        <Shell>
            <article data-gl-from="1" data-gl-dim="0.3" className="relative px-5 pb-24 pt-36 md:px-10 md:pt-48">
                <div className="mx-auto max-w-[1600px]">
                    <Reveal>
                        <Link href="/projects" className="eyebrow inline-flex items-center gap-3 transition-colors hover:!text-amber">
                            <span aria-hidden>←</span> All work
                        </Link>
                    </Reveal>

                    <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
                        <SplitReveal as="h1" text={project.title} immediate className="display max-w-5xl text-[15vw] leading-[0.88] md:text-[9vw]" />
                        <Reveal delay={0.2} className="eyebrow">
                            {String(index + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}
                        </Reveal>
                    </div>

                    <Rule className="mt-12" />
                    <dl className="grid grid-cols-2 gap-8 py-8 md:grid-cols-4">
                        <Reveal>
                            <dt className="eyebrow mb-2">Category</dt>
                            <dd className="text-bone">{project.category}</dd>
                        </Reveal>
                        <Reveal delay={0.05} className="col-span-2 md:col-span-2">
                            <dt className="eyebrow mb-2">Stack &amp; scope</dt>
                            <dd className="text-bone">{project.tags.join(" · ")}</dd>
                        </Reveal>
                        {project.url && (
                            <Reveal delay={0.1}>
                                <dt className="eyebrow mb-2">Live</dt>
                                <dd>
                                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-amber underline-offset-4 hover:underline">
                                        {new URL(project.url).hostname} ↗
                                    </a>
                                </dd>
                            </Reveal>
                        )}
                    </dl>
                    <Rule />

                    <Reveal delay={0.1} className="relative mt-12 aspect-[16/9] overflow-hidden rounded-sm bg-ink-3">
                        <ProjectVisual project={project} sizes="(max-width: 1600px) 100vw, 1600px" priority />
                    </Reveal>

                    <div className="mt-20 grid gap-10 md:grid-cols-12 md:mt-28">
                        <span className="eyebrow md:col-span-3">Overview</span>
                        <Reveal className="md:col-span-8">
                            <p className="display text-3xl leading-[1.15] tracking-[-0.02em] md:text-[2.8rem]">{project.description}</p>
                            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-bone-dim">{project.overview}</p>
                        </Reveal>
                    </div>
                </div>
            </article>

            {/* Next project teaser */}
            <section data-gl-from="2" data-gl-dim="0.6" className="relative px-5 py-24 md:px-10 md:py-32">
                <div className="mx-auto max-w-[1600px]">
                    <Rule />
                    <Link href={`/projects/${next.slug}`} data-cursor="Next" className="group block pt-12">
                        <span className="eyebrow">Next project</span>
                        <span className="display mt-6 block text-[14vw] leading-[0.9] transition-colors duration-500 group-hover:text-amber md:text-[8vw]">
                            {next.title} <span className="display-italic inline-block transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-6">→</span>
                        </span>
                    </Link>
                </div>
            </section>
        </Shell>
    );
}
