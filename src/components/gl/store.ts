// Shared, non-React state between the particle field and UI that steers it.

export type GlTarget = { shape: number; x: number; dim: number; portrait?: number };

// When set, the particle field follows this instead of the scroll position
export const glOverride: { current: GlTarget | null } = { current: null };
