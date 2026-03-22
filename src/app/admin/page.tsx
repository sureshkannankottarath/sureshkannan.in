import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from './actions'

export default async function AdminDashboard() {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/admin/login')
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] p-8 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Admin <span className="text-[#71717A] font-light italic">Panel</span></h1>

                    <form action={signOut}>
                        <button type="submit" className="text-sm font-bold uppercase tracking-widest text-[#71717A] hover:text-[#18181B] transition-colors cursor-pointer">
                            Sign Out
                        </button>
                    </form>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm flex flex-col items-start">
                        <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
                        <p className="text-[#71717A] mb-8">Create, edit, and delete your portfolio projects.</p>
                        <Link href="/admin/projects" className="mt-auto px-6 py-3 bg-[#18181B] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">Go to Projects</Link>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm flex flex-col items-start">
                        <h2 className="text-xl font-bold mb-4">Manage Blogs</h2>
                        <p className="text-[#71717A] mb-8">Write and publish essentially new blog posts for your audience.</p>
                        <Link href="/admin/blogs" className="mt-auto px-6 py-3 bg-[#18181B] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">Go to Blogs</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
