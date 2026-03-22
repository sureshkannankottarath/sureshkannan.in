import { updateProject } from '../../actions'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ImageInputWithPreview from '@/components/admin/ImageInputWithPreview'

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const supabase = await createClient()
    const { data: project } = await supabase.from('projects').select('*').eq('id', params.id).single()

    if (!project) {
        notFound()
    }

    const updateProjectForm = updateProject.bind(null, params.id)
    const tagsDefault = project.tags ? project.tags.join(', ') : ""

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] p-8 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 flex items-center gap-4">
                    <Link href="/admin/projects" className="text-gray-400 hover:text-black transition-colors">← Back</Link>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Edit <span className="text-[#71717A] font-light italic">Project</span></h1>
                </header>

                <form action={updateProjectForm} className="bg-white p-8 md:p-10 rounded-2xl border border-black/5 shadow-sm space-y-6">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="title">Project Title</label>
                        <input className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none" id="title" name="title" defaultValue={project.title} type="text" required />
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="slug">Slug (URL endpoint)</label>
                        <input className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none" id="slug" name="slug" defaultValue={project.slug} type="text" required />
                    </div>

                    <ImageInputWithPreview label="Project Image" name="image" currentImageUrl={project.image || ""} />

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="tags">Tags (Comma separated)</label>
                        <input className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none" id="tags" name="tags" defaultValue={tagsDefault} type="text" required />
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="description">Description (Overview)</label>
                        <textarea className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none min-h-[150px]" id="description" name="description" defaultValue={project.description} required></textarea>
                    </div>

                    <button type="submit" className="px-8 py-4 mt-6 bg-[#18181B] text-white rounded-full font-bold uppercase tracking-widest hover:bg-black/80 transition-colors shadow-lg cursor-pointer w-full md:w-auto">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}
