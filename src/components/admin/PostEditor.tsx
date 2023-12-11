"use client";
import React, { useState, useCallback, use } from 'react'
import { uploadPostToDB } from '@/controllers/clientController';
import TextUploader from './TextUploader';
import ImageUploader from './ImageUploader';
import TitleUploader from './TitleUploader';
import CodeUploader from './CodeUploader';
import { Post } from '@/app/page';
import { updatePost, createPost } from '@/controllers/server_actions';
import Link from 'next/link';
import Submit from './Submit';

export type TextSection = {
    id: number
    type: 'text'
    deletable: boolean
    content: string,
}

export type CodeSection = {
    id: number
    type: 'code'
    deletable: boolean
    language: string
    content: string
    description: string
}

export type ImageSection = {
    id: number
    type: 'image'
    deletable: boolean
    publicUrl: string
    imgName: string
    description: string
}

export type Section = TextSection | ImageSection | CodeSection

export type PostTitle = {
    title: string,
    publicUrl: string,
    name: string
}

const newImageSection: ImageSection = {
    id: 0,
    type: "image",
    deletable: true,
    publicUrl: "",
    imgName: "",
    description: ""
}

const newCodeSection: CodeSection = {
    id: 0,
    type: "code",
    deletable: true,
    language: "jsx",
    content: "",
    description: ""
}

const newTextSection: TextSection = {
    id: 0,
    type: "text",
    deletable: true,
    content: ""
}

const PostEditor = ({ post }: { post: Post }) => {
    const [title, setTitle] = useState<PostTitle>(post.title)
    const [sections, setSections] = useState<Section[]>(post.content)
    const [reset, setRest] = useState(false)

    const writeTextHandler = useCallback((e: any) => {
        e.preventDefault()
        const { name: id, value, role } = e.target;
        const curSection = sections[id - 1];
        if (curSection.type != "text") return
        const newSections = sections.map((section) => {
            if (section.id == id) {
                return (
                    {
                        ...section,
                        content: value
                    }
                )
            }
            return section
        })
        console.log(newSections)
        setSections(newSections)

    }, [sections])

    const writeCodeHandler = useCallback((e: any) => {
        e.preventDefault()
        const { name: id, value } = e.target;
        console.log(id)
        const curSection = sections[id - 1];
        if (curSection.type != "code") return
        const newSections = sections.map((section) => {
            if (section.id == id) {
                return {
                    ...section,
                    content: value
                }
            }
            return section
        })
        console.log(newSections)
        setSections(newSections)

    }, [sections])

    const onCodeLangChange = useCallback((e: any) => {
        e.preventDefault();
        const { id, value } = e.target;
        const curSection = sections[id - 1];
        if (curSection.type != "code") return
        const newSections = sections.map((section) => {
            if (section.id == id) {
                return {
                    ...section,
                    language: value
                }
            }
            return section
        })
        console.log(newSections)
        setSections(newSections)

    }, [sections])

    const writeCodeDescriptionHandler = useCallback((e: any) => {
        e.preventDefault();
        const { name: id, value } = e.target;
        const curSection = sections[id - 1];
        if (curSection.type != "code") return
        const newSections = sections.map((section) => {
            if (section.id == id) {
                return {
                    ...section,
                    description: value
                }
            }
            return section
        })
        setSections(newSections)


    }, [sections])

    const writeImageDescriptionHandler = useCallback((e: any) => {
        e.preventDefault();

        const { name: id, value } = e.target;

        const newSections = sections.map((section) => {
            if (section.id == id && section.type == "image") {
                return {
                    ...section,
                    description: value
                }
            }
            return section
        })
        console.log(newSections)
        setSections(newSections)
    }, [sections])

    const updateImageSection = useCallback((id: number, publicUrl: string) => {
        const newSections = sections.map((section) => {
            if (section.id == id) {
                return {
                    ...section,
                    publicUrl
                }
            }
            return section
        })
        setSections(newSections)
    }, [sections])

    const addSection = useCallback((id: number, type: "text" | "image" | "code") => {
        console.log("add section", id, type)
        const newSection: Section =
        {
            ...(type == 'text' ? newTextSection : type == 'image' ? newImageSection : newCodeSection),
            id: id + 1
        }


        const newSections = new Array<Section>()
        for (let section of sections) {
            if (section.id <= id) newSections.push(section);
            if (section.id == id) newSections.push(newSection)
            if (section.id > id) newSections.push({
                ...section,
                id: section.id + 1
            })
        }
        setSections(newSections)
    }, [sections])

    const deleteSection = useCallback((id: number) => {
        console.log("delete section :", id)
        const newSections: Section[] = new Array();
        for (let section of sections) {
            if (section.id < id) {
                newSections.push(section)
            }
            else if (section.id > id) {
                const newSection = { ...section, id: section.id - 1 }
                newSections.push(newSection)
            }
        }
        setSections(newSections)
    }, [sections])

    const updateTitle = (prop: PostTitle) => {
        setTitle(prop);
    }

    return (
        <div className='container mx-auto px-3 max-w-2xl pt-20 pb-12 flex flex-col gap-6 items-center'>
            <Link href='/admin' className=' self-start -mb-2'>
                <div className="flex items-center gap-1 bg-slate-600 text-white font-semibold p-2 rounded-lg hover:bg-slate-500 shadow-lg  ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    <p>
                        Admin
                    </p>
                </div>
            </Link>
            <TitleUploader updateTitle={updateTitle} title={title} setTitle={setTitle} reset={reset} />
            {
                sections.map((section) => (
                    section.type == "text" ?
                        <TextUploader key={section.id} section={section} deleteHandler={deleteSection} writeTextHandler={writeTextHandler} addSection={addSection} />
                        :
                        section.type == "image" ?
                            <ImageUploader key={section.id} section={section} deleteHandler={deleteSection} updateImageSection={updateImageSection} addSection={addSection} writeImageDescriptionHandler={writeImageDescriptionHandler} />
                            : <CodeUploader key={section.id} section={section} deleteHandler={deleteSection} writeCodeHandler={writeCodeHandler} addSection={addSection} onCodeLangChange={onCodeLangChange} writeCodeDescriptionHandler={writeCodeDescriptionHandler} />
                ))
            }
            <form>
                <Submit formAction={post._id == "" ? () => { createPost(title, sections) } : () => { updatePost({ ...post, title, content: sections }) }} text={post._id == "" ? "Create Post" : "Update Post"} />
            </form>
        </div>
    )
}

export default PostEditor