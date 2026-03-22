import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { createClient } from '@/lib/supabase/server'
import { createBrowserClient } from '@supabase/ssr'
import React from "react";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

export const revalidate = 60; // ISR cache

export async function generateStaticParams() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: blogs } = await supabase.from('blogs').select('slug')

    return (blogs || []).map((blog) => ({
        slug: blog.slug,
    }))
}

export default async function BlogPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const supabase = await createClient()

    const { data: blog } = await supabase.from('blogs').select('*').eq('slug', params.slug).single()

    if (!blog) {
        notFound();
    }

    const titleWords = blog.title.split(' ');
    const firstWord = titleWords[0];
    const restOfTitle = titleWords.slice(1).join(' ');

    return (
        <main id="main-scroll" className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-[#FAFAFA] text-[#18181B] selection:bg-black/10 selection:text-black">
            <Nav />
            <section className="min-h-[100dvh] w-full pt-32 pb-24 md:pt-48 md:pb-32 bg-[#FAFAFA] relative">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 w-full flex flex-col items-center">

                    <AnimatedSection className="w-full flex justify-start">
                        <Link href="/blogs" className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-[#71717A] hover:text-[#18181B] transition-colors mb-12 group">
                            <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                            Back to Journal
                        </Link>
                    </AnimatedSection>

                    <AnimatedSection delayMs={100} className="w-full">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4">{new Date(blog.created_at).toLocaleDateString()}</p>
                        <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.9] mb-12 shadow-sm break-words">
                            {firstWord}
                            {restOfTitle && <br />}
                            {restOfTitle && (
                                <span className={`text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>
                                    {restOfTitle}
                                </span>
                            )}
                        </h1>
                    </AnimatedSection>

                    {blog.image && (
                        <AnimatedSection delayMs={200} className="w-full relative aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden mb-16 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5 bg-white">
                            <Image src={blog.image} alt={blog.title} fill className="object-cover object-center" priority />
                        </AnimatedSection>
                    )}

                    <AnimatedSection delayMs={300} className="w-full">
                        <div className="text-lg md:text-xl text-[#18181B] leading-relaxed font-medium">
                            {blog.content.split('\n').map((paragraph: string, i: number) => (
                                <p key={i} className="mb-6">{paragraph}</p>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <div className="w-full border-t border-black/5 bg-white"></div>
            <Contact />
        </main>
    );
}
