"use client"
import { Section, TextSection } from "./PostEditor";
import { ReactNode, useState, memo } from "react";
import Markdown from "react-markdown";

type props = {
    section: TextSection,
    deleteHandler: (id: number) => void,
    writeTextHandler: (e: any) => void,
    addSection: (id: number, type: "text" | "image" | "code") => void
}

const TextUploader = ({
    section,
    deleteHandler,
    writeTextHandler,
    addSection
}: props) => {
    const [isPreview, serIsPreview] = useState(false)
    const DeleteBtn = () => {
        return (
            <div className="absolute top-3 right-3 rounded hover:text-slate-500 hover:cursor-pointer" onClick={() => deleteHandler(section.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
            </div>
        )
    }
    const AddingBtns = () => (
        <div className='flex flex-row-reverse absolute bottom-2 right-2 items-center max-w-[2rem] bg-slate-500 text-white overflow-hidden group hover:max-w-3xl rounded-xl transition-all duration-500 ease-in-out'>
            <div className="p-1 transition-all duration-300 hover:cursor-pointer ease-in-out group-hover:rotate-90" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div >
            <button className='py-1 px-2 w-fit hover:bg-slate-600' onClick={() => addSection(section.id, 'code')}>
                code
            </button>
            <button className='py-1 px-2 w-fit hover:bg-slate-600' onClick={() => addSection(section.id, 'image')}>
                image
            </button>
            <button className='py-1 px-2 w-fit hover:bg-slate-600' onClick={() => addSection(section.id, 'text')}>
                text
            </button>
        </div >
    )
    const handleOnClick = (e: any) => {
        e.preventDefault()
        const fakeInputChange = {
            preventDefault: () => { },
            target: {
                name: e.target.name,
                role: "title",
                value: ""
            }
        }
        writeTextHandler(fakeInputChange)
    }

    return (
        <div className="px-3 pt-4 pb-14 rounded-2xl bg-slate-300 w-full border border-slate-400 shadow-xl relative">
            {section.deletable ? <DeleteBtn /> : ""}
            <AddingBtns />
            <label htmlFor={`section${section.id}`} className="block font-bold mb-2">Section {section.id}.</label>
            {/* <label htmlFor={`section${section.id}`} className="block font-semibold mb-2">content :</label> */}
            <div className="mb-2">
                <input type="checkbox" name="preview" id={`preview${section.id}`} className="mx-1" onClick={() => { serIsPreview(pre => !pre) }} />
                <label htmlFor={`preview${section.id}`} className="text-slate-700 font-medium">preview</label>
            </div>
            {
                !isPreview ?
                    <textarea id={`section${section.id}`} role="article" rows={4} name={`${section.id}`} value={section.content} onChange={writeTextHandler} className="w-full border border-gray-300 py-2 px-3 rounded-lg"></textarea>
                    :
                    <div className=" prose bg-white p-3 rounded-lg">
                        <Markdown>
                            {section.content}
                        </Markdown>
                    </div>
            }

        </div>
    )
}
export default memo(TextUploader);