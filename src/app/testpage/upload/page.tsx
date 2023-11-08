"use client";
import { useState } from "react";
import { Stream } from "stream";
import { uploadImagesToBucket } from "@/controllers/clientController";

export default function Page() {
    const [url, setUrl] = useState("")
    const [file, setFile] = useState(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (file == null) return
        const res = await uploadImagesToBucket([file])
        console.log(await res.json())
    };
    const handleOnChange = (e: any) => {
        console.log((e.target.files[0]).data);
        console.log(URL.createObjectURL(e.target.files[0]))
        setUrl(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <img src={url} alt="" />
            <form action='form' onSubmit={handleSubmit}>
                <div>
                    <h3>Select your files</h3>
                    <input
                        type="file"

                        // To select multiple files
                        //multiple="multiple"
                        onChange={(e) => handleOnChange(e)}
                    />

                </div>
                <button className='btn btn-primary' >
                    Send Files
                </button>
            </form>
        </div>
    )
}