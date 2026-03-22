import { login } from './actions'

export default async function LoginPage(props: { searchParams: Promise<{ message: string }> }) {
    const searchParams = await props.searchParams;

    return (
        <div className="min-h-[100dvh] bg-[#FAFAFA] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl border border-black/5 shadow-xl">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-[#18181B] mb-2">Admin Login</h1>
                <p className="text-[#71717A] text-sm mb-8">Access the portfolio dashboard.</p>

                {searchParams?.message && (
                    <div className="p-4 mb-6 text-sm text-red-600 bg-red-50 font-medium rounded-xl border border-red-100">{searchParams.message}</div>
                )}

                <form className="flex flex-col gap-6">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-3 block" htmlFor="email">Email address</label>
                        <input className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B] transition-colors" id="email" name="email" type="email" required />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-3 block" htmlFor="password">Password</label>
                        <input className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B] transition-colors" id="password" name="password" type="password" required />
                    </div>

                    <button formAction={login} className="w-full py-4 mt-2 bg-[#18181B] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/90 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                        Enter Dashboard
                    </button>
                </form>
            </div>
        </div>
    )
}
