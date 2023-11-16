
import ServerSupabase from "@/utils/supabase/supabase.server"
import { revalidatePath } from 'next/cache'
const NavBar = () => {
    const supabase = ServerSupabase()


    async function login(formData: FormData) {
        "use server";
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                redirectTo: "http://localhost:3000/auth/callback?next=/login"
            }
        })
        
        revalidatePath('/login_client')
    }


    return (
        <form action={login} className="flex flex-col">
            <button>Sign In</button>
        </form>
    )
}
export default NavBar