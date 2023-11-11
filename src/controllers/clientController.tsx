"use client";
import { useRouter } from "next/router";
const basePath = ''
export async function uploadImagesToBucket(files: File[]) {
    const body = new FormData();
    files.map((file: File) => {
        body.append("file", file)
    })
    console.log("sending request...",body)
    const res = await fetch(`${basePath}/admin/api/image`, {
        method: "POST",
        body
    })
    
    return await res.json()
}

export async function uploadPostToDB(title: any, content: any) {
    const body = JSON.stringify(
        {
            title,
            content
        }
    )
    const res = await fetch(`${basePath}/admin/api/post`, {
        method: "POST",
        body
    })
    const resault = await res.json()
    return resault
}