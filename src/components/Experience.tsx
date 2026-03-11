import { AnimatedSection } from "./ui/AnimatedSection";

export function Experience() {
    return (
        <section id="experience" className="py-24 relative">
            <div className="max-w-4xl mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold font-syne mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-accent-blue">
                                Experience
                            </span>
                        </h2>
                        <div className="h-1 w-24 bg-accent-blue mx-auto rounded-full opacity-50"></div>
                    </div>
                </AnimatedSection>

                <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-none">
                    {/* Central Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

                    {/* Timeline Item */}
                    <AnimatedSection delayMs={100} className="relative mb-12">
                        <div className="md:flex items-center justify-between w-full">
                            {/* Desktop Left Side (Empty or Date) */}
                            <div className="hidden md:block w-5/12 text-right pr-8">
                                <span className="text-accent-blue font-mono text-sm tracking-wider bg-accent-blue/10 px-4 py-1.5 rounded-full border border-accent-blue/20">
                                    2020 – Present
                                </span>
                            </div>

                            {/* Timeline Marker */}
                            <div className="absolute left-[-5px] md:static md:left-auto w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-blue shadow-[0_0_15px_rgba(0,212,255,0.5)] z-10 mx-auto" />

                            {/* Mobile Date (hidden on desktop) */}
                            <div className="md:hidden block pl-8 mb-4">
                                <span className="text-accent-blue font-mono text-sm tracking-wider">
                                    2020 – Present
                                </span>
                            </div>

                            {/* Content Card */}
                            <div className="w-full md:w-5/12 pl-8 md:pl-0 md:text-left">
                                <div className="glass-card p-6 rounded-2xl border-white/5 hover:border-accent-blue/30 transition-colors group">
                                    <h3 className="text-xl font-syne font-semibold text-text-primary mb-1">
                                        AI Engineer & PM
                                    </h3>
                                    <h4 className="text-accent-green mb-4 text-sm font-medium">
                                        Bobcares / Poornam Info Vision
                                    </h4>
                                    <p className="text-text-muted text-sm leading-relaxed">
                                        Building AI-powered support systems, semantic search, and LLM
                                        infrastructure for a global managed hosting company. Leading teams
                                        to deploy scalable and production-ready intelligent systems.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
