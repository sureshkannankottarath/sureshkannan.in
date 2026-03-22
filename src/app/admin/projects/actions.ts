'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { uploadImage } from '@/lib/s3'

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const imageFile = formData.get('image') as File
    const description = formData.get('description') as string
    const tagsRaw = formData.get('tags') as string

    const tags = tagsRaw.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)

    let imageUrl = ''
    if (imageFile && imageFile.type.startsWith('image/')) {
        const uploadedUrl = await uploadImage(imageFile, 'projects')
        if (uploadedUrl) imageUrl = uploadedUrl
    }

    // Auth check just in case
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const { error } = await supabase.from('projects').insert({
        title,
        slug,
        image: imageUrl,
        description,
        tags
    })

    if (error) {
        console.error("Error creating project:", error)
        throw new Error(error.message)
    }

    revalidatePath('/projects')
    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const imageFile = formData.get('image') as File
    const description = formData.get('description') as string
    const tagsRaw = formData.get('tags') as string

    const tags = tagsRaw.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    let imageUrl = formData.get('currentImage') as string || ''

    if (imageFile && imageFile.type.startsWith('image/')) {
        const uploadedUrl = await uploadImage(imageFile, 'projects')
        if (uploadedUrl) imageUrl = uploadedUrl
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const { error } = await supabase.from('projects').update({
        title,
        slug,
        image: imageUrl,
        description,
        tags
    }).match({ id })

    if (error) {
        console.error("Error updating project:", error)
        throw new Error(error.message)
    }

    revalidatePath('/projects')
    revalidatePath(`/projects/${slug}`)
    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}

export async function deleteProject(id: string) {
    const supabase = await createClient()

    // Auth check just in case
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    await supabase.from('projects').delete().match({ id })

    revalidatePath('/projects')
    revalidatePath('/admin/projects')
}
