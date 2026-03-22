import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteBlog } from './actions'

export default async function AdminBlogsList() {
    const supabase = await createClient()
    const { data: blogs } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] p-8 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-gray-400 hover:text-black transition-colors">← Back</Link>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Manage <span className="text-[#71717A] font-light italic">Blogs</span></h1>
                    </div>

                    <Link href="/admin/blogs/new" className="px-6 py-3 bg-[#18181B] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors shadow-sm cursor-pointer">
                        + New Blog
                    </Link>
                </header>

                <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
                    {blogs && blogs.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-black/5 bg-gray-50/50">
                                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-[#71717A]">Title</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-[#71717A]">Slug</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-[#71717A]">Date</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-widest text-[#71717A]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog) => (
                                    <tr key={blog.id} className="border-b border-black/5 last:border-0 hover:bg-gray-50/50">
                                        <td className="p-4 font-semibold">{blog.title}</td>
                                        <td className="p-4 text-gray-500 text-sm">{blog.slug}</td>
                                        <td className="p-4 text-gray-500 text-sm">{new Date(blog.created_at).toLocaleDateString()}</td>
                                        <td className="p-4 flex items-center gap-4">
                                            <Link href={`/admin/blogs/edit/${blog.id}`} className="text-xs font-bold uppercase tracking-widest text-[#71717A] hover:text-[#18181B] cursor-pointer">Edit</Link>
                                            <form action={deleteBlog.bind(null, blog.id)}>
                                                <button type="submit" className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 cursor-pointer">Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            No blogs found. Click the button above to create your first post!
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
