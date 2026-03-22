import { createBlog } from '../actions'
import Link from 'next/link'
import ImageInputWithPreview from '@/components/admin/ImageInputWithPreview'

export default function NewBlogPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] p-8 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 flex items-center gap-4">
                    <Link href="/admin/blogs" className="text-gray-400 hover:text-black transition-colors">← Back</Link>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Write <span className="text-[#71717A] font-light italic">Blog</span></h1>
                </header>

                <form action={createBlog} className="bg-white p-8 md:p-10 rounded-2xl border border-black/5 shadow-sm space-y-6">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="title">Title</label>
                        <input className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none" id="title" name="title" type="text" required />
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="slug">Slug (URL endpoint)</label>
                        <input className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none" id="slug" name="slug" type="text" placeholder="my-awesome-post" required />
                    </div>

                    <ImageInputWithPreview label="Cover Image" name="image" />

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block" htmlFor="content">Content (Markdown supported)</label>
                        <textarea className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none min-h-[400px]" id="content" name="content" required></textarea>
                    </div>

                    <button type="submit" className="px-8 py-4 mt-6 bg-[#18181B] text-white rounded-full font-bold uppercase tracking-widest hover:bg-black/80 transition-colors shadow-lg cursor-pointer w-full md:w-auto">
                        Publish Blog
                    </button>
                </form>
            </div>
        </div>
    )
}
