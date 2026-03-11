interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hasTopAccent?: boolean;
}

export function GlassCard({ children, className = "", hasTopAccent = false }: GlassCardProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,212,255,0.15)] group ${className}`}
        >
            {hasTopAccent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-accent-green opacity-70 group-hover:opacity-100 transition-opacity" />
            )}

            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer-sweep_1.5s_infinite]" />

            <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
                {children}
            </div>
        </div>
    );
}
