"use client";
import { Section, ImageSection } from "@/app/admin/page";
import { uploadImagesToBucket } from "@/controllers/clientController";
import { useEffect, useRef, useState,memo } from "react";
import Image from "next/image";

type props =  {
    section: ImageSection,
    deleteHandler: (id: number) => void,
    updateImageSection: (id: number, publicUrl: string, description: string) => void,
    addSection: (id: number, type: "text"|"image") => void
}

export type InputFile = {
    file?: File,
    url: string,
    name: string,
    description?: string
}

const ImageUploader = ({ section, deleteHandler, updateImageSection, addSection }: props) => {
    const [inputFile, setInputFile] = useState<InputFile>({
        url: section.publicUrl as string,
        name: section.imgName as string,
        description: section.description
        
    })
    const [onLoad, setOnLoading] = useState(false)
    // useEffect(() => {
    //     setInputFile({
    //         url: section.publicUrl as string,
    //         name: section.imgName as string,
    //         description: section.description

    //     })
    // }, [])

    const submitHandler = async (e: any) => {
        setOnLoading(true)
        if (!inputFile || !inputFile.file) return
        const url = await uploadImagesToBucket([inputFile.file]).then((res)=>{setOnLoading(false);return res});
        updateImageSection(section.id, url, inputFile.description as string)
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
    const handleTextOnChange = (e: any) => {
        e.preventDefault();
        if (!inputFile) return
        const description = e.target.value;
        setInputFile({
            ...inputFile,
            description
        })
    }
    const DeleteBtn = () => {
        return (
            <div className="absolute top-3 right-3 rounded hover:text-slate-500 hover:cursor-pointer" onClick={() => deleteHandler(section.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
            </div>
        )
    }
    const isPublic = () => {
        const url = inputFile?.url
        if (section.publicUrl ) return true
        if (!url || (url?.split(":"))[0] == "blob" || section.publicUrl !== url) return false
        return true
    }
    const AddingBtns = () => (
        <div className='flex flex-row-reverse absolute bottom-2 right-2 items-center max-w-[2rem] bg-slate-500 text-white overflow-hidden group hover:max-w-3xl rounded-xl transition-all duration-500 ease-in-out'>
            <div className="p-1 transition-all duration-200 hover:cursor-pointer ease-in-out group-hover:rotate-90" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div >
            <button className='py-1 px-2 w-fit hover:bg-slate-600' onClick={() => addSection(section.id, 'image')}>
                image
            </button>
            <button className='py-1 px-2 w-fit hover:bg-slate-600' onClick={() => addSection(section.id, 'text')}>
                text
            </button>
        </div >
    )
    return (
        <div className="px-20 pt-4 pb-14 rounded-2xl bg-slate-300 w-[40rem] border border-slate-400 shadow-xl relative">
            {section.deletable ? <DeleteBtn /> : ""}
            <AddingBtns />
            <div>
                <label htmlFor={`section${section.id}`} className="block font-bold mb-2">Section {section.id}.</label>
                {
                    section.publicUrl || inputFile.url ?
                        <div className="h-48 w-60 relative rounded-lg overflow-hidden border border-slate-400 my-3">
                            <Image src={inputFile.url ? inputFile.url : section.publicUrl as string} className="object-cover" sizes="12rem" alt="" fill />
                        </div>
                        : ""
                }
                <label className="text-white bg-slate-500 py-1 px-2 my-2 mr-2 rounded w-fit hover:bg-slate-400 hover:cursor-pointer">
                    <input
                        id={`section${section.id}`}
                        type="file"
                        onChange={(e) => handleFileOnChange(e)}
                        className="hidden"
                        disabled={onLoad}
                        accept="image/*"
                    />
                    Select Image
                </label>
                {section.publicUrl || inputFile.url ?
                    <>
                        <span className="">{inputFile.name}</span>
                        <br />
                        <label className="block font-semibold my-2">Description:</label>
                        <textarea placeholder='what is this image about?' value={inputFile.description} onChange={handleTextOnChange} className="border border-gray-300 py-2 px-3 rounded-lg"></textarea>
                    </>
                    : ""
                }


            </div>
            <button disabled={onLoad || inputFile.file==undefined || inputFile.description==undefined || inputFile.description==""} className='bg-slate-600 text-white py-1 px-2 my-2 rounded w-fit flex gap-1 hover:bg-slate-500 disabled:cursor-not-allowed' onClick={submitHandler}>
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
                            isPublic() ?
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

export default memo(ImageUploader)