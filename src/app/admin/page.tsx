"use client";
import React, { useState, useCallback } from 'react'
import { uploadPostToDB } from '../../controllers/clientController';
import TextUploader from '../../components/TextUploader';
import ImageUploader from '../../components/ImageUploader';
import TitleUploader from '../../components/TitleUploader';

export type TextSection = {
    id: number
    type: 'text'
    deletable: boolean
    content: string,
    sectionTitle:string
}

export type ImageSection = {
    id: number
    type: 'image'
    deletable: boolean
    publicUrl: string
    imgName: string
    description: string
}

export type Section = TextSection | ImageSection

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

const newTextSection: TextSection = {
    id: 0,
    type: "text",
    deletable: true,
    content: "",
    sectionTitle:""
}

const AdminPage = () => {
    const [title, setTitle] = useState<PostTitle>({ title: "", publicUrl: "", name: "" })
    const [sections, setSections] = useState<Section[]>([{
        ...newTextSection,
        id: 1,
        deletable: false
    }])
    const [reset, setRest] = useState(false)
    const clear = () => {
        console.log("clean")
        setRest(pre => !pre)
        setSections([{
            ...newTextSection,
            id:1,
            deletable:false
        }])
        setTitle({ title: "", publicUrl: "", name: "" })
    }
    const handleSubmit = async () => {
        if (!title.title || !title.publicUrl) {
            alert("your title is invalid!")
            return
        }
        else if (!(sections[0] as TextSection).content) {
            alert("your first section is empty")
            return
        }
        const res = await uploadPostToDB(title, sections)
        if (res["acknowledged"] != true) {
            alert("fail to create, try it latter")
            return
        }
        alert("post created!")
        clear()

    }

    const writeTextHandler = useCallback((e: any) => {
        e.preventDefault()
        const { name: id, value, role } = e.target;
        const curSection = sections[id - 1];
        if (curSection.type == "image") return
        const newSections = sections.map((section) => {
            if (section.id == id) {
                return role=="article"?
                {
                    ...section,
                    content: value
                }:
                {
                    ...section,
                    sectionTitle:value
                }
            }
            return section
        })
        console.log(newSections)
        setSections(newSections)

    }, [sections])
    const updateImageSection = useCallback((id: number, publicUrl: string, description: string) => {
        const newSections = sections.map((section) => {
            if (section.id == id) {
                return {
                    ...section,
                    publicUrl,
                    description
                }
            }
            return section
        })
        setSections(newSections)
    }, [sections])

    const addSection = useCallback((id: number, type: "text" | "image") => {
        console.log("add section", id)
        const newSection: Section =
        {
            ...type == 'text' ? newTextSection : newImageSection,
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

    const SectionList = () => (


        sections.map((section) => (
            section.type == "text" ?
                <TextUploader key={section.id} section={section} deleteHandler={deleteSection} writeTextHandler={writeTextHandler} addSection={addSection} />
                :
                <ImageUploader key={section.id} section={section} deleteHandler={deleteSection} updateImageSection={updateImageSection} addSection={addSection} />
        ))

    )
    return (
        <div className='mx-auto px-24 pt-12 pb-12 flex flex-col gap-6 items-center'>
            <TitleUploader updateTitle={updateTitle} title={title} setTitle={setTitle} reset={reset} />
            {
                sections.map((section) => (
                    section.type == "text" ?
                        <TextUploader key={section.id} section={section} deleteHandler={deleteSection} writeTextHandler={writeTextHandler} addSection={addSection} />
                        :
                        <ImageUploader key={section.id} section={section} deleteHandler={deleteSection} updateImageSection={updateImageSection} addSection={addSection} />
                ))
            }
            <button onClick={handleSubmit} className='p-2 font-bold text-white rounded-xl border border-slate-500 shadow-lg bg-slate-600 hover:bg-slate-500' >Create New Post</button>
        </div>
    )
}

export default AdminPage