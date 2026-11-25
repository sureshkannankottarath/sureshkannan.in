import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/site/Shell";
import { SplitReveal, Reveal, Rule } from "@/components/ui/Reveal";
import { getProxiedImage } from "@/lib/image";
import { createPublicClient, type Blog } from "@/lib/supabase/public";

export const revalidate = 60; // ISR cache

type Props = { params: Promise<{ slug: string }> };

async function getBlog(slug: string) {
    const supabase = createPublicClient();
    const { data } = await supabase.from("blogs").select("*").eq("slug", slug).single();
    return data as Blog | null;
}

export async function generateStaticParams() {
    const supabase = createPublicClient();
    const { data: blogs } = await supabase.from("blogs").select("slug");
    return (blogs || []).map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { slug } = await props.params;
    const blog = await getBlog(slug);
    if (!blog) return {};
    return { title: `${blog.title} | Suresh Kannan`, description: blog.content?.slice(0, 160) };
}

export default async function BlogPage(props: Props) {
    const { slug } = await props.params;
    const blog = await getBlog(slug);
    if (!blog) notFound();

    const date = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(blog.created_at));
    const paragraphs = (blog.content ?? "").split("\n").filter((p) => p.trim());

    return (
        <Shell>
            <article data-gl-from="0" data-gl-dim="0.25" className="relative px-5 pb-24 pt-36 md:px-10 md:pt-48">
                <div className="mx-auto max-w-[1100px]">
                    <Reveal>
                        <Link href="/blogs" className="eyebrow inline-flex items-center gap-3 transition-colors hover:!text-amber">
                            <span aria-hidden>←</span> Journal
                        </Link>
                    </Reveal>
                    <Reveal delay={0.1} className="eyebrow mt-10">
                        {date}
                    </Reveal>
                    <SplitReveal as="h1" text={blog.title} immediate className="display mt-6 block text-[12vw] leading-[0.92] md:text-[6vw]" />
                    <Rule className="mt-12" />

                    {blog.image && (
                        <Reveal delay={0.15} className="relative mt-12 aspect-[21/9] overflow-hidden rounded-sm bg-ink-3">
                            <Image src={getProxiedImage(blog.image)} alt={blog.title} fill sizes="(max-width: 1100px) 100vw, 1100px" className="object-cover" priority />
                        </Reveal>
                    )}

                    <div className="mx-auto mt-16 max-w-[68ch]">
                        {paragraphs.map((paragraph, i) => (
                            <p
                                key={i}
                                className={`mb-7 text-lg leading-[1.75] text-bone/90 md:text-xl ${i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-[family-name:var(--font-display)] first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-amber" : ""}`}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </article>
        </Shell>
    );
}
