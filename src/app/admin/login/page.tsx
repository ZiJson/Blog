import ServerSupabase from "@/utils/supabase/supabase.server";
import { redirect } from 'next/navigation'
import Image from "next/image";
import google_icon from '../../../../public/google.svg'
import { userLogin } from "@/controllers/server_actions";

export default function Login() {

    return (
        <div className="container mx-auto min-h-[60vh] pt-24 flex flex-col gap-20 items-center">
            <h1 className="text-4xl text-center font-extrabold text-slate-700 ">You Must Login To Enter Admin Page</h1>
            <form action={userLogin} className="flex flex-col">
                <button type="submit" className="bg-slate-600 text-3xl text-white font-semibold px-3 py-1 rounded-lg shadow-lg flex gap-2 hover:bg-slate-800">
                    <Image src={google_icon} alt="google" priority width={30}></Image>
                    Sign In
                </button>
            </form>
        </div>
    )
}