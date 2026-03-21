import { AnimatedSection } from "./ui/AnimatedSection";

export function Contact() {
    return (
        <footer id="contact" className="pt-24 pb-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-accent-blue/5 blur-[120px] rounded-[100%] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center">
                <AnimatedSection>
                    <h2 className="text-4xl md:text-6xl font-bold font-syne tracking-tight mb-8">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-muted">
                            Let&apos;s build something <br className="hidden md:block" />
                            <span className="text-accent-blue animate-shimmer bg-[length:200%_auto] bg-gradient-to-r from-accent-blue via-accent-green to-accent-blue bg-clip-text text-transparent">
                                intelligent
                            </span> together.
                        </span>
                    </h2>
                </AnimatedSection>

                <AnimatedSection delayMs={100}>
                    <div className="flex items-center justify-center gap-6 mb-24">
                        <a
                            href="https://linkedin.com/in/YOUR_LINKEDIN_STUB"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="w-14 h-14 rounded-full glass-card flex items-center justify-center group hover:-translate-y-1 hover:border-accent-blue/50 transition-all"
                        >
                            <svg
                                className="w-5 h-5 text-text-muted group-hover:text-accent-blue transition-colors"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>

                        <a
                            href="mailto:contact@example.com"
                            aria-label="Email"
                            className="w-14 h-14 rounded-full glass-card flex items-center justify-center group hover:-translate-y-1 hover:border-accent-blue/50 transition-all"
                        >
                            <svg
                                className="w-6 h-6 text-text-muted group-hover:text-accent-blue transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </a>

                        <a
                            href="https://github.com/YOUR_GITHUB_STUB"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="w-14 h-14 rounded-full glass-card flex items-center justify-center group hover:-translate-y-1 hover:border-accent-blue/50 transition-all"
                        >
                            <svg
                                className="w-6 h-6 text-text-muted group-hover:text-accent-blue transition-colors"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                />
                            </svg>
                        </a>
                    </div>
                </AnimatedSection>

                <div className="border-t border-black/5 pt-8 mt-12">
                    <p className="text-text-muted text-sm font-light">
                        © 2025 Suresh Kannan K. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
