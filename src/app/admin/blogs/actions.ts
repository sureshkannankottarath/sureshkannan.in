'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createBlog(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const image = formData.get('image') as string
    const content = formData.get('content') as string

    // Auth check just in case
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const { error } = await supabase.from('blogs').insert({
        title,
        slug,
        image,
        content
    })

    if (error) {
        console.error("Error creating blog:", error)
        throw new Error(error.message)
    }

    revalidatePath('/blogs')
    revalidatePath('/admin/blogs')
    redirect('/admin/blogs')
}

export async function deleteBlog(id: string) {
    const supabase = await createClient()

    // Auth check just in case
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await supabase.from('blogs').delete().match({ id })

    revalidatePath('/blogs')
    revalidatePath('/admin/blogs')
}
