"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";
import { createClient } from '@/lib/supabase/client'
import Link from "next/link";
import Image from "next/image";
import { getProxiedImage } from "@/lib/image";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

import { Search } from "lucide-react";

export default function BlogsList() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            const supabase = createClient();
            const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
            setBlogs(data || []);
            setLoading(false);
        };
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter((blog) => {
        const query = searchQuery.toLowerCase();
        return (
            blog.title.toLowerCase().includes(query) ||
            (blog.content && blog.content.toLowerCase().includes(query))
        );
    });

    return (
        <main id="main-scroll" className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-[#FAFAFA] text-[#18181B] selection:bg-black/10 selection:text-black">
            <Nav />

            <section className="min-h-[100dvh] w-full pt-32 pb-24 md:pt-48 md:pb-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">

                    <AnimatedSection>
                        <div className="mb-10 text-center flex flex-col items-center">
                            <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[6rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.8] mb-6">
                                THE
                                <br />
                                <span className={`text-[3rem] sm:text-[3.5rem] lg:text-[5rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>journal.</span>
                            </h1>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delayMs={150}>
                        <div className="max-w-xl mx-auto mb-16 relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-[#71717A] group-focus-within:text-[#18181B] transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles by title or content..."
                                className="w-full pl-14 pr-6 py-4 bg-[#FAFAFA] border border-black/10 rounded-full text-base font-medium text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B] transition-all shadow-[0_5px_15px_rgba(0,0,0,0.03)] focus:shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
                            />
                        </div>
                    </AnimatedSection>

                    {!loading && (
                        <AnimatedSection delayMs={200}>
                            <div className="mb-8 text-center md:text-left text-sm font-bold uppercase tracking-widest text-[#71717A]">
                                Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Article' : 'Articles'}
                            </div>
                        </AnimatedSection>
                    )}

                    {loading ? (
                        <div className="py-24 text-center text-gray-400 text-sm font-bold uppercase tracking-widest">
                            Loading articles...
                        </div>
                    ) : filteredBlogs.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredBlogs.map((blog, index) => (
                                <AnimatedSection key={blog.id} delayMs={index * 100}>
                                    <Link href={`/blogs/${blog.slug}`} className="group block">
                                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6 bg-gray-100 border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all">
                                            {blog.image ? (
                                                <Image src={getProxiedImage(blog.image)} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200"></div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-2">{new Date(blog.created_at).toLocaleDateString()}</p>
                                            <h3 className="text-xl md:text-2xl font-bold text-[#18181B] group-hover:text-black/70 transition-colors leading-tight line-clamp-2">
                                                {blog.title}
                                            </h3>
                                        </div>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    ) : (
                        <AnimatedSection delayMs={200}>
                            <div className="py-24 text-center">
                                <p className="text-[#71717A] font-medium text-lg">No journal entries found matching '{searchQuery}'.</p>
                            </div>
                        </AnimatedSection>
                    )}
                </div>
            </section>

            <div className="w-full border-t border-black/5 bg-white"></div>
            <Contact />
        </main>
    );
}
