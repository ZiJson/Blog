"use client";
import { uploadImagesToBucket } from "@/controllers/clientController";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { InputFile } from "./ImageUploader";
import { PostTitle } from "@/app/admin/page";

type props = {
    updateTitle: (prop: PostTitle) => void,
    title: PostTitle,
    setTitle: React.Dispatch<React.SetStateAction<PostTitle>>,
    reset: boolean
}


const TitleUploader = ({ updateTitle, title, setTitle, reset }: props) => {
    const [onLoad, setOnLoad] = useState(false)
    const [inputFile, setInputFile] = useState<InputFile>({ url: "", name: "" })
    useEffect(() => {
        clearInput()
    }, [reset])
    const clearInput = () => {
        setInputFile({ url: "", name: "" })
    }
    const handleFileOnChange = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        const url = URL.createObjectURL(file)
        const name = file.name
        setInputFile({
            file,
            url,
            name
        })
    }

    const handelTitleChange = (e: any) => {
        e.preventDefault()
        const titleTemp = e.target.value;
        setTitle({
            ...title,
            title: titleTemp
        })
    }

    const submitHandler = async () => {
        if (!title || !inputFile.file) return
        setOnLoad(true)
        const url: string = await uploadImagesToBucket([inputFile.file]).then((res) => { setOnLoad(false); return res });
        const prop: PostTitle = {
            ...title,
            publicUrl: url,
            name: inputFile.name
        }
        setInputFile({
            ...inputFile,
            url
        })
        updateTitle(prop)
    }

    const isPublic = () => {
        const { url } = inputFile;
        if (!url || url.split(":")[0] == "blob") return false
        return true
    }
    const updatable = isPublic()

    return (
        <div className="px-20 pt-4 pb-4 rounded-2xl bg-slate-300 w-[40rem] border border-slate-400 shadow-xl relative">
            <label htmlFor="title" className="block font-bold mb-2">Title</label>
            <textarea id="title" value={title.title} className="w-full border border-gray-300 py-2 px-3 mb-2 rounded-lg" onChange={handelTitleChange}></textarea>
            {
                inputFile.url ?
                    <div className="h-48 w-60 relative rounded-lg overflow-hidden border border-slate-400 my-3">
                        <Image src={inputFile.url} className="object-cover" sizes="12rem" alt="" fill />
                    </div>
                    : ""
            }
            <label className="text-white bg-slate-500 py-1 px-2 my-2 mr-2 rounded w-fit hover:bg-slate-400 hover:cursor-pointer">
                <input
                    type="file"
                    onChange={(e) => handleFileOnChange(e)}
                    className="hidden"
                    accept="image/*"
                />
                Select Image
            </label>
            <span className="">{inputFile.name}</span>
            <button disabled={onLoad || inputFile.file ? false : true || !title} className='bg-slate-600 text-white py-1 px-2 my-2 rounded w-fit flex gap-1 hover:bg-slate-500 disabled:cursor-not-allowed' onClick={submitHandler}>
                {onLoad ?
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="animate-spin w-6 h-6 ">
                            <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                        </svg>
                        <span>Uploading...</span>
                    </>
                    :
                    <>
                        {
                            updatable ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>
                                : ""}
                        <span>Upload</span>
                    </>
                }
            </button>
        </div>
    )
}

export default TitleUploader