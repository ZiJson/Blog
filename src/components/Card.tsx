'use client';
import React, { useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { Post } from "@/app/page";
import { TextSection } from "@/app/admin/page";

export type Cols = "1" | "2" | "3";


type PropsType = {
    col: Cols
    post: Post
}

const Card = (props: PropsType) => {
    return (
        props.col == "1" ? <CardType1 post={props.post} /> :
            props.col == "2" ? <CardType2 post={props.post} /> :
                <CardType3 post={props.post} />
    )
}

const CardType1 = ({ post }: { post: Post }) => {
    const date = new Date(post.date)
    const firstSection = post.content[0] as TextSection
    return (
        <Link href={`/post/${post._id}`} className=" col-span-1">
            <div className="group h-[60vh]">
                <div className="w-full h-1/2 relative">
                    <Image src={post.title.publicUrl as string} alt="sample"
                        fill={true}
                        sizes="(min-width: 1540px) 416px, (min-width: 1280px) 331px, (min-width: 1040px) 245px, (min-width: 780px) 328px, (min-width: 640px) 264px, calc(100vw - 64px)"
                        className="object-cover rounded-lg transition duration-500 group-hover:scale-105 group-hover:shadow-xl">
                    </Image>
                </div>
                <div className="w-full h-2/5 flex flex-col gap-3 mt-3">
                    <div className="line-clamp-2 min-h-[4rem] text-2xl font-semibold text-slate-800 transition duration-700 ease-in-out group-hover:translate-x-3">
                        {post.title.title}
                    </div>
                    <div className="text-base font-semibold text-slate-600 transition duration-700 ease-in-out group-hover:translate-x-6">
                        {date.toLocaleDateString()}
                    </div>
                    <div className="line-clamp-3 text-base text-slate-400 transition duration-500 ease-in-out group-hover:text-slate-700">
                        {firstSection.content}
                    </div>
                </div>
            </div>
        </Link>
    )
}
const CardType3 = ({ post }: { post: Post }) => {
    const date = new Date(post.date)
    const firstSection = post.content[0] as TextSection

    return (
        <>
            <div className="md:hidden">
                <CardType1 post={post} />
            </div>
            <div className="col-span-2 group h-[60vh] hidden md:block" >
                <Link href={`/post/${post._id}`}>
                    <div className=" flex relative">
                        <div className="w-4/6 h-[22rem] relative">
                            <Image src={post.title.publicUrl as string} alt="sample" fill className=" object-cover rounded-lg transition duration-500 group-hover:scale-105 group-hover:shadow-xl"></Image>
                        </div>
                        <div className="w-2/3 h-1/2 flex flex-col text-gray-950 absolute right-0">
                            <div className="text-4xl font-bold bg-slate-800/[.85] rounded-lg leading-tight mt-20 text-white p-2 pl-4 transition-all duration-700 ease-in-out group-hover:-translate-x-6 group-hover:bg-slate-800 group-hover:px-6">
                                <p className=" line-clamp-2">
                                    {post.title.title}
                                </p>
                            </div>
                            <div className="text-2xl font-semibold text-slate-600/90 p-2 text-right transition duration-700 ease-in-out group-hover:-translate-x-16">
                                {date.toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <div className="line-clamp-2 mt-[1.4rem] text-base text-slate-400 transition duration-500 ease-in-out group-hover:text-slate-700">
                        {firstSection.content}
                    </div>
                </Link>
            </div >
        </>


    )
}
const CardType2 = ({ post }: { post: Post }) => {
    const date = new Date(post.date)
    const firstSection = post.content[0] as TextSection

    return (
        <>
            <div className="md:hidden">
                <CardType1 post={post} />
            </div>
            <div className="col-span-2 h-[60vh] group hidden md:block">
                <Link href={`/post/${post._id}`}>
                    <div className="flex h-full flex-col items-end relative">
                        <div className="w-4/6 h-[77%] relative">
                            <Image src={post.title.publicUrl as string} alt="sample" fill className=" object-cover rounded-lg transition duration-500 group-hover:scale-105 group-hover:shadow-xl"></Image>
                        </div>
                        <div className="w-full flex flex-col text-gray-950 absolute" >
                            <div className="text-4xl font-bold h-32 bg-slate-800/[.85] rounded-lg leading-tight mt-20 text-white p-2 pl-4 w-2/3 transition-all duration-700 ease-in-out group-hover:translate-x-6 group-hover:bg-slate-800 group-hover:px-6 ">
                                <p className=" line-clamp-2">
                                    {post.title.title}
                                </p>
                            </div>
                            <div className="text-2xl font-semibold text-slate-600/90 p-2 transition duration-700 ease-in-out group-hover:translate-x-16">
                                {date.toLocaleDateString()}
                            </div>
                        </div>
                        <div className="line-clamp-2 mt-6 text-base text-slate-400 transition duration-500 ease-in-out group-hover:text-slate-700">
                            {firstSection.content}
                        </div>
                    </div>
                </Link>
            </div >
        </>
    )
}

export default Card;