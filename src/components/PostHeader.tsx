"use client";
import useHeaderMode from "@/hooks/useHeaderMode";
import Header from "./Header";

const PostHeader = () => {
    const {darkMode} = useHeaderMode();
    return <Header dark={darkMode}/>
}

export default PostHeader