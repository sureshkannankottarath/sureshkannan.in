import Image from "next/image";
import { AnimatedSection } from "./ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";
import projects from "../data/projects.json";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

export function Projects() {
    return (
        <section id="projects" className="min-h-[100dvh] w-full flex flex-col justify-center relative bg-white border-t border-black/5 snap-start snap-always py-24 md:py-0">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                <AnimatedSection>
                    <div className="mb-10 lg:mb-14 text-center">
                        <h2 className="text-[4.5rem] lg:text-[6rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.8]">
                            SELECTED
                            <br />
                            <span className={`text-[3.5rem] lg:text-[5rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>works.</span>
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {projects.map((project, index) => (
                        <AnimatedSection key={project.title} delayMs={index * 150}>
                            <div className="group cursor-pointer">
                                {project.image && (
                                    <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-[#FAFAFA] border border-black/5">
                                        <Image src={project.image} alt={project.title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                )}
                                <h3 className="text-xl lg:text-2xl font-bold text-[#18181B] mb-3 tracking-tight uppercase">
                                    {project.title}
                                </h3>
                                <p className="text-[#71717A] text-sm md:text-base mb-5 leading-relaxed font-medium line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <div key={tag} className="px-4 py-1.5 bg-[#FAFAFA] border border-black/5 rounded-full text-xs font-semibold text-[#18181B] uppercase tracking-wider">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection delayMs={500}>
                    <div className="mt-12 text-center">
                        <a href="https://github.com/YOUR_GITHUB_STUB" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#18181B] font-bold uppercase tracking-widest text-xs md:text-sm hover:opacity-70 transition-opacity">
                            View All Projects
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
