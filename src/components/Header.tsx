import Medias from "./Medias"
import Link from "next/link"
type props = {
    dark: boolean
}
const NormalHeader = ({ dark }: props) => {
    return (
        <div className="w-fit pt-12 ">
        <Link href="/">
            <h2 className={`py-2 ml-1 text-lg font-extrabold transition duration-500 ${!dark ? 'text-slate-500' : 'text-slate-400'}`}>Blog</h2>
            <h1 className={`mb-2 ml-3 text-3xl font-bold pb-1 tracking-wider transition duration-300 ${!dark ? 'text-slate-700' : 'text-white'}`}>Zijie Lin_</h1>
        </Link>
        <Medias dark={dark} size="md"/>
    </div>
    )
}

const BarHeader = ({ dark }: props) => {
    return (
        <div className={`w-screen h-12 ${!dark&&'backdrop-blur-lg bg-white/40'} flex items-center justify-between px-2`}>
            <Link href="/" className="flex items-cente gap-1"> 
                <h2 className={` text-lg font-extrabold transition duration-500 ${!dark ? 'text-slate-500' : 'text-slate-400'}`}>Blog </h2>
                <span className="text-lg font-extrabold">|</span>
                <h1 className={`text-lg font-extrabold tracking-wider transition duration-300 ${!dark ? 'text-slate-700' : 'text-white'}`}>Zijie Lin_</h1>
            </Link>
            <Medias dark={dark} size="sm"/>
        </div>
    )
}

export {NormalHeader,BarHeader}