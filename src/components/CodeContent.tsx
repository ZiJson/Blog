"use client"
import { CodeBlock, github, atomOneLight } from "react-code-blocks"
type props = {
    code: string
    lenguage: string
    description:string
}

const CodeContent = ({ code, lenguage,description }: props) => {
    console.log(lenguage)
    return (
        <div>
            <div className=" w-fit rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.04] border border-slate-100 overflow-hidden text-base p-4  transition duration-300" style={{ lineHeight: "1.5" }}>
                <CodeBlock
                    text={code}
                    language={lenguage}
                    showLineNumbers={false}
                    theme={{ ...atomOneLight, backgroundColor: "white" }}
                />
            </div>
            <div className="text-sm text-slate-400 m-2 pt-1">
                {description}
            </div>
        </div>
    )
}

export default CodeContent