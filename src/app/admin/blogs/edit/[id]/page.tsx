import { updateBlog } from '../../actions'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditBlogPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const supabase = await createClient()
    const { data: blog } = await supabase.from('blogs').select('*').eq('id', params.id).single()

    if (!blog) {
        notFound()
    }

    const updateBlogForm = updateBlog.bind(null, params.id)

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] p-8 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 flex items-center gap-4">
                    <Link href="/admin/blogs" className="text-gray-400 hover:text-black transition-colors">← Back</Link>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Edit <span className="text-[#71717A] font-light italic">Blog</span></h1>
                </header>

                <form action={updateBlogForm} className="bg-white p-8 md:p-10 rounded-2xl border border-black/5 shadow-sm space-y-6">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="title">Title</label>
                        <input className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none" id="title" name="title" type="text" defaultValue={blog.title} required />
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="slug">Slug (URL endpoint)</label>
                        <input className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none" id="slug" name="slug" type="text" defaultValue={blog.slug} required />
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="image">Cover Image URL</label>
                        <input className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none" id="image" name="image" type="text" defaultValue={blog.image || ""} placeholder="https://images.unsplash.com/photo-..." />
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="content">Content (Markdown supported)</label>
                        <textarea className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none min-h-[400px]" id="content" name="content" defaultValue={blog.content} required></textarea>
                    </div>

                    <button type="submit" className="px-8 py-4 mt-6 bg-[#18181B] text-white rounded-full font-bold uppercase tracking-widest hover:bg-black/80 transition-colors shadow-lg cursor-pointer w-full md:w-auto">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}
