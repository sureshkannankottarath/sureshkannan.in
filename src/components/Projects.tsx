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
                    <div className="mb-20 text-center">
                        <h2 className="text-[5rem] lg:text-[7rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.8] mb-4">
                            SELECTED
                            <br />
                            <span className={`text-[4rem] lg:text-[6rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>works.</span>
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {projects.map((project, index) => (
                        <AnimatedSection key={project.title} delayMs={index * 150}>
                            <div className="group cursor-pointer">
                                {project.image && (
                                    <div className="relative w-full aspect-[4/3] mb-8 overflow-hidden bg-[#FAFAFA] border border-black/5">
                                        <Image src={project.image} alt={project.title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                )}
                                <h3 className="text-3xl font-bold text-[#18181B] mb-4 tracking-tight uppercase">
                                    {project.title}
                                </h3>
                                <p className="text-[#71717A] text-lg mb-6 leading-relaxed font-medium line-clamp-3">
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
            </div>
        </section>
    );
}
