'use client';
import React, { useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { Post } from "@/app/page";

export type Cols = "1" | "2" | "3";


interface PropsType {
    col: Cols
    post: Post
}

const Card = (props: PropsType) => {
    return (
        props.col == "1" ? <CardType1 post={props.post} /> : props.col == "2" ? <CardType2 post={props.post} /> : <CardType3 post={props.post} />
    )
}

const CardType1 = ({ post }: { post: Post }) => {
    const date = new Date(post.date)
    return (
        <Link href={`/post/${post._id}`}>
            <div className="group h-[calc(120vh/2)]">
                <div className="w-full h-1/2 relative">
                    <Image src={post.title.publicUrl as string} alt="sample" fill className=" object-cover rounded-lg transition duration-500 group-hover:scale-105 group-hover:shadow-xl"></Image>
                </div>
                <div className="w-full h-2/5 flex flex-col gap-3 mt-3">
                    <div className="line-clamp-2 text-3xl font-semibold text-slate-900 transition duration-700 ease-in-out group-hover:translate-x-3">
                        {post.title.title}
                    </div>
                    <div className="text-base font-semibold text-slate-600 transition duration-700 ease-in-out group-hover:translate-x-6">
                        {date.toLocaleDateString()}
                    </div>
                    <div className="line-clamp-3 text-base text-slate-400 transition duration-500 ease-in-out group-hover:text-slate-700">
                        {post.content[0].content}
                    </div>
                </div>
            </div>
        </Link>
    )
}
const CardType3 = ({ post }: { post: Post }) => {
    return (
        <div className="col-span-2">
            <Link href={`/post/${post._id}`}>
                <div className="group h-[calc(100vh/2)] flex relative">
                    <div className="w-4/6 h-full relative">
                        <Image src={post.title.publicUrl as string} alt="sample" fill className=" object-cover rounded-lg transition duration-500 group-hover:scale-105 group-hover:shadow-xl"></Image>
                    </div>
                    <div className="w-2/3 h-1/2 flex flex-col text-gray-950 absolute right-0">
                        <div className="text-6xl font-bold bg-slate-800/[.85] rounded-lg leading-tight mt-20 text-white p-2 pl-4 transition-all duration-700 ease-in-out group-hover:-translate-x-6 group-hover:bg-slate-800 group-hover:px-6">
                            {post.title.title}
                        </div>
                        <div className="text-2xl font-semibold text-slate-600/90 p-2 text-right transition duration-700 ease-in-out group-hover:-translate-x-16">
                            2023.10.04
                        </div>
                    </div>

                </div>
            </Link>
        </div>
    )
}
const CardType2 = ({ post }: { post: Post }) => {
    return (
        <div className="col-span-2">
            <Link href={`/post/${post._id}`}>
                <div className="col-span-2 group h-[calc(100vh/2)] flex flex-row-reverse relative">
                    <div className="w-4/6 h-full relative">
                        <Image src={post.title.publicUrl as string} alt="sample" fill className=" object-cover rounded-lg transition duration-500 group-hover:scale-105 group-hover:shadow-xl"></Image>
                    </div>
                    <div className="w-full h-1/2 flex flex-col text-gray-950 absolute" >
                        <div className="text-6xl font-bold bg-slate-800/[.85] rounded-lg leading-tight mt-20 text-white p-2 pl-4 w-2/3 transition-all duration-700 ease-in-out group-hover:translate-x-6 group-hover:bg-slate-800 group-hover:px-6">
                            {post.title.title}
                        </div>
                        <div className="text-2xl font-semibold text-slate-600/90 p-2 transition duration-700 ease-in-out group-hover:translate-x-16">
                            2023.10.04
                        </div>
                    </div>
                </div>
            </Link>
        </div >
    )
}

export default Card;