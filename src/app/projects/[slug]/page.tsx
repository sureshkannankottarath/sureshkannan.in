import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import projects from "@/data/projects.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SiPython, SiNextdotjs, SiOpenai, SiFastapi, SiDocker } from "react-icons/si";
import { FaDatabase, FaRobot, FaBrain, FaMagnifyingGlass, FaLeaf, FaShieldHalved } from "react-icons/fa6";
import React from "react";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
        case "rag": return <FaBrain className="w-5 h-5 text-[#8B5CF6]" />;
        case "python": return <SiPython className="w-5 h-5 text-[#3776AB]" />;
        case "chromadb": return <FaDatabase className="w-5 h-5 text-[#FF5733]" />;
        case "qwen": return <FaRobot className="w-5 h-5 text-[#3B82F6]" />;
        case "next.js": return <SiNextdotjs className="w-5 h-5 text-[#000000]" />;
        case "openai": return <SiOpenai className="w-5 h-5 text-[#412991]" />;
        case "fastapi": return <SiFastapi className="w-5 h-5 text-[#009688]" />;
        case "semantic search": return <FaMagnifyingGlass className="w-5 h-5 text-[#4285F4]" />;
        case "docker": return <SiDocker className="w-5 h-5 text-[#2496ED]" />;
        case "celery": return <FaLeaf className="w-5 h-5 text-[#37A853]" />;
        case "security": return <FaShieldHalved className="w-5 h-5 text-[#EF4444]" />;
        default: return <span className="text-xs font-bold uppercase tracking-widest">{tag}</span>;
    }
};

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    // Split title for styling
    const titleWords = project.title.split(' ');
    const firstWord = titleWords[0];
    const restOfTitle = titleWords.slice(1).join(' ');

    return (
        <main id="main-scroll" className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-[#FAFAFA] text-[#18181B] selection:bg-black/10 selection:text-black">
            <Nav />
            {/* Project content section */}
            <section className="min-h-[100dvh] w-full pt-32 pb-24 md:pt-48 md:pb-32 bg-[#FAFAFA] relative">
                <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full flex flex-col items-center">

                    <AnimatedSection className="w-full flex justify-start">
                        <Link href="/#projects" className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-[#71717A] hover:text-[#18181B] transition-colors mb-12 md:mb-16 group">
                            <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                            Back to Projects
                        </Link>
                    </AnimatedSection>

                    <AnimatedSection delayMs={100} className="w-full text-center">
                        <h1 className="text-[3rem] sm:text-[4.5rem] lg:text-[6rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.9] mb-8 shadow-sm break-words">
                            {firstWord}
                            {restOfTitle && <br />}
                            {restOfTitle && (
                                <span className={`text-[2.5rem] sm:text-[4rem] lg:text-[5rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>
                                    {restOfTitle}
                                </span>
                            )}
                        </h1>
                    </AnimatedSection>

                    <AnimatedSection delayMs={200} className="w-full flex justify-center gap-4 flex-wrap mb-12 md:mb-16">
                        {project.tags.map((tag: string) => (
                            <div key={tag} className="flex items-center gap-2 justify-center px-4 md:px-6 py-2 md:py-3 rounded-full bg-white border border-black/5 shadow-[0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)] transition-all">
                                {getTagIcon(tag)}
                                <span className="text-xs md:text-sm uppercase font-bold tracking-widest text-[#18181B]">{tag}</span>
                            </div>
                        ))}
                    </AnimatedSection>

                    <AnimatedSection delayMs={300} className="w-full relative aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden mb-16 md:mb-24 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5 group cursor-pointer bg-white">
                        {project.image && (
                            <Image src={project.image} alt={project.title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-in-out" priority />
                        )}
                    </AnimatedSection>

                    <AnimatedSection delayMs={400} className="w-full max-w-3xl flex flex-col items-center">
                        <p className="text-xl md:text-3xl font-medium text-[#18181B] leading-relaxed text-center mb-10 md:mb-16">
                            {project.description}
                        </p>

                        <div className="w-16 h-px bg-[#18181B]/10 mb-12" />

                        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16 text-left">
                            <div className="flex-1">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[#18181B] mb-4">Challenge</h3>
                                <p className="text-[#71717A] leading-relaxed font-medium">
                                    Building a production-ready system requires precise engineering and scalable infrastructure. The challenge was to integrate robust technologies while maintaining high performance and user satisfaction, directly targeting architectural bottlenecks.
                                </p>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[#18181B] mb-4">Result</h3>
                                <p className="text-[#71717A] leading-relaxed font-medium">
                                    Leveraging {project.tags.join(', ')}, we successfully delivered a dynamic, highly responsive platform. It improved overall efficiency and ensured a premium, seamless experience tailored for scale.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Separator before Contact */}
            <div className="w-full border-t border-black/5 bg-white"></div>

            <Contact />
        </main>
    );
}
