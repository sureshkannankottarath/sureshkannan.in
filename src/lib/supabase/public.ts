import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Cookie-less anon client for public reads, so pages can be statically cached
export function createPublicClient() {
    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { auth: { persistSession: false } }
    )
}

export type Blog = {
    id: string
    title: string
    slug: string
    image: string | null
    content: string | null
    created_at: string
}
