"use client";
import React, { useState, useEffect, ReactNode, memo, useCallback } from 'react'
import { uploadImagesToBucket, uploadPostToDB } from '../_controllers/clientController';
import TextUploader from '../_components/Card/TextUploader';
import ImageUploader from '../_components/Card/ImageUploader';
import TitleUploader from '../_components/Card/TitleUploader';

export enum SectionType {
    "Text" = 'text',
    "Image" = 'image'
}

export interface Section {
    id: number,
    type: SectionType,
    deletable: boolean,
    content?: string,
    publicUrl?: string,
    imgName?: string,
    description?: string
}

export interface Title {
    title: string,
    publicUrl?: string,
    name?: string
}

const AdminPage = () => {
    const [title, setTitle] = useState<Title>({ title: "", publicUrl: "", name: "" })
    const [sections, setSections] = useState<Section[]>([{
        id: 1,
        type: SectionType.Text,
        content: "",
        deletable: false
    }])
    const [reset, setRest] = useState(false)
    const clear = () => {
        const sectionExample = {
            id: 1,
            type: SectionType.Text,
            content: "",
            deletable: false
        }
        console.log("clean")
        setRest(pre => !pre)
        setSections([sectionExample])
        setTitle({ title: "", publicUrl: "", name: "" })
    }
    const handleSubmit = async () => {
        if (!title.title || !title.publicUrl) {
            alert("your title is invalid!")
            return
        }
        else if (!(sections[0]).content) {
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

    const writeTextHandler = (e: any) => {
        e.preventDefault()
        console.log(sections)
        const { name: id, value } = e.target;
        if (sections[id - 1].content == value) return
        const newSections = sections.map((section) => {
            if (section.id == id) {
                return {
                    ...section,
                    content: value
                }
            }
            return section
        })
        setSections(newSections)
    }
    const updateImageSection = (id: number, publicUrl: string, description: string) => {
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
    }

    const addSection = (id: number, type: SectionType) => {
        console.log("add section", id)

        const newSections = new Array<Section>()
        for (let section of sections) {
            if (section.id <= id) newSections.push(section);
            if (section.id == id) newSections.push({ id: id + 1, type, deletable: true })
            if (section.id > id) newSections.push({
                ...section,
                id: section.id + 1
            })
        }
        setSections(newSections)
    }

    const deleteSection = (id: number) => {
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
    }

    const updateTitle = (prop: Title) => {
        setTitle(prop);
    }

    const SectionList = () => (


        sections.map((section) => (
            section.type == SectionType.Text ?
                <TextUploader key={section.id} section={section} deleteHandler={deleteSection} writeTextHandler={writeTextHandler} addSection={addSection} />
                :
                <ImageUploader key={section.id} section={section} deleteHandler={deleteSection} updateImageSection={updateImageSection} addSection={addSection} />
        ))

    )
    return (
        <div className='mx-auto px-24 pt-12 pb-12 flex flex-col gap-6 items-center'>
            <TitleUploader updateTitle={updateTitle} title={title} setTitle={setTitle} reset={reset} />
            <SectionList/>  
            <button onClick={handleSubmit} className='p-2 font-bold text-white rounded-xl border border-slate-500 shadow-lg bg-slate-600 hover:bg-slate-500' >Create New Post</button>
        </div>
    )
}

export default AdminPage