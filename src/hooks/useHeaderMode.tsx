'use client';
import { useState, useEffect } from "react";
import useScroll from "./useScroll";
import useWindowDimensions from "./useWindowDimension";

type DarkMode = {
    darkMode: boolean
}

const checkOver = (y:number,h:number):boolean => {
    if (y >= h ) return true
    else return false
}
const useHeaderMode = (): DarkMode => {
    const scrollXY = useScroll();
    const windowDimensions = useWindowDimensions()
    const header_height = windowDimensions.height * 0.8
    const [darkMode, setDarkMode] = useState(true)
    useEffect(() => {
        setDarkMode(!checkOver(scrollXY.y,header_height))
    },[scrollXY,header_height])



    return { darkMode }
}

export default useHeaderMode;