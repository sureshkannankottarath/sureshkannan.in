"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProxiedImage } from "@/lib/image";
import type { Blog } from "@/lib/supabase/public";
import { SplitReveal, Reveal, Rule } from "./ui/Reveal";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export function JournalList({ blogs }: { blogs: Blog[] }) {
    const [query, setQuery] = useState("");
    const q = query.trim().toLowerCase();
    const visible = blogs.filter((b) => !q || b.title.toLowerCase().includes(q) || b.content?.toLowerCase().includes(q));

    return (
        <section data-gl-from="0" data-gl-dim="0.4" className="relative min-h-[100svh] px-5 pb-32 pt-36 md:px-10 md:pt-48">
            <div className="mx-auto max-w-[1600px]">
                <span className="eyebrow mb-6 block">Journal · {blogs.length} {blogs.length === 1 ? "entry" : "entries"}</span>
                <h1 className="display text-[17vw] leading-[0.85] md:text-[11vw]">
                    <SplitReveal text="Notes from" immediate className="block" />
                    <SplitReveal text="the noise." immediate delay={0.12} className="display-italic block text-amber" />
                </h1>

                <Reveal delay={0.3} className="mt-16 flex justify-end">
                    <label className="flex w-full items-center gap-3 border-b border-line pb-2 md:w-80">
                        <span className="eyebrow">Search</span>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="title or content…"
                            className="w-full bg-transparent text-bone placeholder:text-mute focus:outline-none"
                        />
                    </label>
                </Reveal>

                <Rule className="mt-10" />
                {visible.map((blog, i) => (
                    <Reveal key={blog.id} delay={Math.min(i, 6) * 0.05}>
                        <Link href={`/blogs/${blog.slug}`} data-cursor="Read" className="group grid grid-cols-12 items-center gap-6 border-b border-line py-8">
                            <span className="eyebrow col-span-12 md:col-span-2">{dateFormat.format(new Date(blog.created_at))}</span>
                            <h2 className="display col-span-12 text-4xl leading-[1] transition-[color,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-amber md:col-span-7 md:text-6xl">
                                {blog.title}
                            </h2>
                            <div className="relative col-span-12 aspect-[16/10] overflow-hidden rounded-sm bg-ink-3 md:col-span-3">
                                {blog.image && (
                                    <Image
                                        src={getProxiedImage(blog.image)}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                    />
                                )}
                            </div>
                        </Link>
                    </Reveal>
                ))}

                {visible.length === 0 && (
                    <p className="display-italic py-24 text-center text-3xl text-bone-dim">
                        {blogs.length === 0 ? "The first entry is being written." : `Nothing matches “${query}”.`}
                    </p>
                )}
            </div>
        </section>
    );
}
