'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { uploadImage } from '@/lib/s3'

export async function createBlog(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const imageFile = formData.get('image') as File
    const content = formData.get('content') as string

    let imageUrl = ''
    if (imageFile && imageFile.type.startsWith('image/')) {
        const uploadedUrl = await uploadImage(imageFile, 'blogs')
        if (uploadedUrl) imageUrl = uploadedUrl
    }

    // Auth check just in case
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const { error } = await supabase.from('blogs').insert({
        title,
        slug,
        image: imageUrl,
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

export async function updateBlog(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const imageFile = formData.get('image') as File
    const content = formData.get('content') as string
    let imageUrl = formData.get('currentImage') as string || ''

    if (imageFile && imageFile.type.startsWith('image/')) {
        const uploadedUrl = await uploadImage(imageFile, 'blogs')
        if (uploadedUrl) imageUrl = uploadedUrl
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const { error } = await supabase.from('blogs').update({
        title,
        slug,
        image: imageUrl,
        content
    }).match({ id })

    if (error) {
        console.error("Error updating blog:", error)
        throw new Error(error.message)
    }

    revalidatePath('/blogs')
    revalidatePath(`/blogs/${slug}`)
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
