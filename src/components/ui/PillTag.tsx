interface PillTagProps {
    children: React.ReactNode;
}

export function PillTag({ children }: PillTagProps) {
    return (
        <span className="inline-flex items-center px-3 py-1 text-sm rounded-full glass-card text-text-primary whitespace-nowrap border-black/10 hover:border-accent-blue/50 transition-colors">
            {children}
        </span>
    );
}
