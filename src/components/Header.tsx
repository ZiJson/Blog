import Medias from "./Medias"
import Link from "next/link"
type props = {
    dark: boolean
}
const Header = ({ dark }: props) => {

    return (
        <div className=" h-[40vh] pt-12 ">
            <Link href="/">
                <h2 className={`py-2 ml-1 text-lg font-extrabold transition duration-500 ${!dark ? 'text-slate-500' : 'text-slate-400'}`}>Blog</h2>
                <h1 className={`mb-2 ml-3 text-3xl font-bold pb-1 tracking-wider transition duration-300 ${!dark ? 'text-slate-700' : 'text-white'}`}>Zijie Lin_</h1>
            </Link>
            <Medias dark={dark} />
        </div>

    )
}

export default Header