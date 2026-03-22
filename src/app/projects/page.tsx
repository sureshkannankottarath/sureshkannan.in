"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { ProjectCard } from "@/components/Projects";
import projectsData from "@/data/projects.json";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";
import { Search } from "lucide-react";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

export default function ProjectsList() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projectsData.filter((project) => {
        const query = searchQuery.toLowerCase();
        return (
            project.title.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });

    return (
        <main id="main-scroll" className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-bg-primary text-text-primary selection:bg-accent-blue/30 selection:text-text-primary">
            <Nav />

            <section className="min-h-[100dvh] w-full pt-32 pb-24 md:pt-48 md:pb-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">

                    {/* Header */}
                    <AnimatedSection>
                        <div className="mb-10 text-center flex flex-col items-center">
                            <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[6rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.8]">
                                ALL
                                <br />
                                <span className={`text-[3rem] sm:text-[3.5rem] lg:text-[5rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>projects.</span>
                            </h1>
                        </div>
                    </AnimatedSection>

                    {/* Search Bar */}
                    <AnimatedSection delayMs={150}>
                        <div className="max-w-xl mx-auto mb-16 relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-[#71717A] group-focus-within:text-[#18181B] transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by title, description or tag..."
                                className="w-full pl-14 pr-6 py-4 bg-[#FAFAFA] border border-black/10 rounded-full text-base font-medium text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B] transition-all shadow-[0_5px_15px_rgba(0,0,0,0.03)] focus:shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
                            />
                        </div>
                    </AnimatedSection>

                    {/* Results Count */}
                    <AnimatedSection delayMs={200}>
                        <div className="mb-8 text-center md:text-left text-sm font-bold uppercase tracking-widest text-[#71717A]">
                            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
                        </div>
                    </AnimatedSection>

                    {/* Project Grid */}
                    {filteredProjects.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 min-h-[40vh]">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard key={project.title} project={project} index={index % 6} />
                            ))}
                        </div>
                    ) : (
                        <AnimatedSection delayMs={300}>
                            <div className="py-24 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-[#FAFAFA] rounded-full flex items-center justify-center mb-6 border border-black/5">
                                    <Search className="w-8 h-8 text-[#A1A1AA]" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#18181B] mb-2">No projects found</h3>
                                <p className="text-[#71717A] max-w-sm">We couldn't find any projects matching "{searchQuery}". Try modifying your search criteria.</p>
                            </div>
                        </AnimatedSection>
                    )}

                </div>
            </section>

            {/* Separator before Contact */}
            <div className="w-full border-t border-black/5 bg-white"></div>

            <Contact />
        </main>
    );
}
