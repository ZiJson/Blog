"use client";
import useHeaderMode from "@/hooks/useHeaderMode";
import { NormalHeader, BarHeader } from "./Header";

const PostHeader = () => {
    const { darkMode } = useHeaderMode();
    return (
        <>
            <div className="hidden lg:block pl-16">
                <NormalHeader dark={darkMode} />
            </div>
            <div className="absolute top-0 block lg:hidden">
                <BarHeader dark={darkMode} />
            </div>
        </>
    )
}

export default PostHeader