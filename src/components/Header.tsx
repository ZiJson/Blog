"use client"

import Medias from "./Medias"
import useScroll from "@/hooks/useScroll"
import useWindowDimensions from "@/hooks/useWindowDimension"
import { useState } from "react"
import Link from "next/link"
type props = {
    dark?: boolean
}
const Header = ({ dark = false }: props) => {
    const [darkMode, setDarkMode] = useState(dark)
    const scrollXY = useScroll();
    const windowDimensions = useWindowDimensions()
    const header_height = windowDimensions.height * (0.8)

    if (scrollXY.y >= header_height && darkMode == true) setDarkMode(false)
    else if (scrollXY.y < header_height && darkMode == false && dark == true) setDarkMode(true)

    return (
        !darkMode ?
            <div className=" h-[40vh] pt-12 ">
                <Link href="/">
                    <h2 className=" py-2 ml-1 text-xl font-extrabold text-slate-500">Blog</h2>
                    <h1 className="mb-2 ml-3 text-4xl font-bold text-slate-700 pb-2 tracking-wider">Zijie Lin_</h1>
                </Link>
                <Medias dark={darkMode}/>
            </div>
            :

            <div className=" h-[40vh] pt-12 ">
                <Link href="/">
                    <h2 className=" py-2 ml-1 text-xl font-extrabold text-slate-300">Blog</h2>
                    <h1 className="mb-2 ml-3 text-4xl font-bold text-slate-200 pb-2 tracking-wider">Zijie Lin_</h1>
                </Link>
                <Medias dark={darkMode}/>
            </div>

    )
}

export default Header