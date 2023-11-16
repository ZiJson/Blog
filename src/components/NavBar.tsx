
import ServerSupabase from "@/utils/supabase/supabase.server"
import { revalidatePath } from 'next/cache'
import { userLogin } from "@/controllers/server_actions"
const NavBar = () => {
    const supabase = ServerSupabase()




    return (
        <form action={userLogin} className="flex flex-col">
            <button>Sign In</button>
        </form>
    )
}
export default NavBar