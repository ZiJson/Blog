'use client';
import React, { useState } from "react";
import styles from "./Card.module.css"
import Image from 'next/image'
import logo from "./sample.jpeg";
import Link from "next/link";

type Cols = "1" | "2" | "3";

type Post = {
    id: string,
    title: string,
    content: string
}

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
    return (
        <Link href={`/post/${post.id}`}>
            <div className="group h-[calc(120vh/2)]">
                <div className="w-full h-1/2 relative">
                    <Image src={logo} alt="sample" fill className=" object-cover rounded-lg transition duration-500 group-hover:scale-105 group-hover:shadow-xl"></Image>
                </div>
                <div className="w-full h-2/5 flex flex-col gap-3 mt-3">
                    <div className="text-base font-medium text-slate-500">
                        2023.10.04
                    </div>
                    <div className="line-clamp-2 text-3xl font-semibold text-slate-700">
                        {post.title}
                    </div>
                    <div className="line-clamp-3 text-base text-slate-400">
                        {post.content}
                    </div>
                </div>
            </div>
        </Link>
    )
}
const CardType3 = ({ post }: { post: Post }) => {
    return (
        <div className="col-span-2">
            <Link href={`/post/${post.id}`}>
                <div className="group h-[calc(100vh/2)] flex relative">
                    <div className="w-4/6 h-full relative">
                        <Image src={logo} alt="sample" fill className=" object-cover rounded-lg transition duration-500 group-hover:scale-105 group-hover:shadow-xl"></Image>
                    </div>
                    <div className="w-4/6 h-1/2 flex flex-col text-gray-950 absolute right-0">
                        <div className={styles.title}>
                            {post.title}
                        </div>
                        <div className={styles.botton}>
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
            <Link href={`/post/${post.id}`}>
                <div className="col-span-2 group h-[calc(100vh/2)] flex flex-row-reverse relative">
                    <div className="w-4/6 h-full relative">
                        <Image src={logo} alt="sample" fill className=" object-cover rounded-lg transition duration-500 group-hover:scale-105 group-hover:shadow-xl"></Image>
                    </div>
                    <div className="w-full h-1/2 flex flex-col text-gray-950 absolute" >
                        <div className={styles.title}>
                            {post.title}
                        </div>
                        <div className={styles.botton}>
                            2023.10.04
                        </div>
                    </div>
                </div>
            </Link>
        </div >
    )
}

export default Card;