import { userLogout } from "@/controllers/server_actions"
import ServerSupabase from "@/utils/supabase/supabase.server"
import Image from "next/image"
import { userLogin } from "@/controllers/server_actions";
import google_icon from '../../../public/google.svg'
import Link from "next/link";


// headersList.get('host'); // to get domain
// headersList.get('next-url'); // to get url
type props = {
    inAdmin: boolean
}

const UserPannel = async ({ inAdmin }: props) => {

    const next = inAdmin ? '/admin' : '/'
    console.log()
    const supabase = ServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return (
        <div className=" fixed bottom-6 right-6 flex flex-col items-center group">
            <form>
                <input type="text" name="next" value={next} readOnly className="hidden" />
                <button formAction={userLogin} className="bg-white rounded-full border p-2 px-3 shadow-lg flex gap-2 hover:scale-105 hover:shadow-xl items-center font-medium rounded-br">
                    <Image src={google_icon} alt="google" priority width={30}></Image>
                    Login
                </button>
            </form>
        </div>
    )
    const { data: { admin_role }, error } = await supabase.from('profiles').select().eq('id', user.id).maybeSingle()
    const { full_name, avatar_url, email } = user.user_metadata
    return (
        <div className=" fixed bottom-6 right-6 flex flex-col items-center group">
            <div className="max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500 flex flex-col items-center ">
                {
                    admin_role ?
                        <Link href='/admin' className="bg-white w-fit p-3 py-1 border border-b-0 shadow-xl rounded-t font-medium hover:bg-gray-100">
                            Admin
                        </Link> : ""
                }
                <form>
                    <input type="text" name="next" value={next} readOnly className="hidden" />
                    <button formAction={userLogout} className="bg-white w-fit p-3 py-1 border border-b-0 shadow-xl rounded-t font-medium hover:bg-gray-100">logout</button>
                </form>
            </div>
            <div className="w-fit p-2 px-3 shadow-lg rounded-full flex items-center gap-2 border bg-white group-hover:scale-105 transition duration-300 rounded-br group-hover:shadow-xl">
                <Image src={avatar_url} alt="avatar" width={32} height={32} unoptimized className="rounded-full"></Image>
                Hi! {full_name}
            </div>
        </div>
    )
}

export default UserPannel