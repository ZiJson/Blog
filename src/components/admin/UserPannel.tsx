import { userLogout } from "@/controllers/server_actions"
import ServerSupabase from "@/utils/supabase/supabase.server"
import Image from "next/image"

type props = {
}

const UserPannel = async ({}:props) => {
    const supabase = ServerSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (!user) return
    const { full_name, avatar_url, email } = user.user_metadata
    return (
        <div className=" fixed bottom-6 right-6 flex flex-col items-center group">
            <div className="max-h-0 group-hover:max-h-96 transition-all duration-500 ">
                <form>
                    <button formAction={userLogout} className="w-fit p-3 py-1 border border-b-0 shadow-xl rounded-t font-medium hover:bg-gray-100">logout</button>
                </form>
            </div>
            <div className="w-fit p-2 px-3 shadow-lg rounded-full flex items-center gap-2 border bg-white group-hover:scale-105 transition duration-300 rounded-br group-hover:shadow-xl">
                <Image src={avatar_url} alt="avatar" width={32} height={32} className="rounded-full"></Image>
                Hi! {full_name}
            </div>
        </div>
    )
}

export default UserPannel