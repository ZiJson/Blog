import { useState } from "react";
import { CodeSection } from "./PostEditor"
import { CodeBlock, CopyBlock, atomOneLight } from 'react-code-blocks';

type props = {
    section: CodeSection,
    deleteHandler: (id: number) => void,
    writeCodeHandler: (e: any) => void,
    onCodeLangChange: (e: any) => void,
    writeCodeDescriptionHandler: (e: any) => void,
    addSection: (id: number, type: "text" | "image" | "code") => void
}

const supported_language = `abap
actionscript
ada
arduino
autoit
c
clojure
cs
c
cpp
coffeescript
csharp
css
cuda
d
dart
delphi
elixir
elm
erlang
fortran
foxpro
fsharp
go
graphql
gql
groovy
haskell
haxe
html
java
javascript
json
julia
jsx
js
kotlin
latex
lisp
livescript
lua
mathematica
makefile
matlab
objectivec
objective
objective
objectpascal
ocaml
octave
perl
php
powershell
prolog
puppet
python
qml
r
racket
restructuredtext
rest
ruby
rust
sass
less
scala
scheme
shell
smalltalk
sql
standardml
sml
swift
tcl
tex
text
tsx
ts
typescript
vala
vbnet
verilog
vhdl
xml
xquery
yaml`.split('\n')


const CodeUploader = ({ section, deleteHandler, writeCodeHandler, addSection, onCodeLangChange, writeCodeDescriptionHandler }: props) => {
    const [isPreview, serIsPreview] = useState(false)
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
    const DeleteBtn = () => {
        return (
            <div className="absolute top-3 right-3 rounded hover:text-slate-500 hover:cursor-pointer" onClick={() => deleteHandler(section.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
            </div>
        )
    }
    return (
        <div className="px-3 pt-4 pb-14 rounded-2xl bg-slate-300 w-full border border-slate-400 shadow-xl relative flex flex-col">
            {section.deletable ? <DeleteBtn /> : ""}
            <AddingBtns />
            <label htmlFor={`section${section.id}`} className="block font-bold mb-2">Section {section.id}.</label>
            <div className="flex justify-between items-center">
                <div>
                    <input type="checkbox" name="preview" id="preview" className="mx-1" onClick={() => { serIsPreview(pre => !pre) }} />
                    <label htmlFor="preview" className="text-slate-700 font-medium">preview</label>
                </div>
                <select id={`${section.id}`} value={section.language} className="m-2 p-1 border rounded-md bg-slate-100 self-end" onChange={onCodeLangChange} style={{ width: "min-conten" }}>
                    {supported_language.map((leng, index) => {
                        return (
                            <option value={leng} defaultChecked={section.language == leng} key={`lang` + index} >{leng}</option>
                        )
                    })}
                </select>
            </div>
            {
                isPreview ?
                    <div className="rounded-lg overflow-hidden">
                        <CodeBlock
                            text={section.content}
                            language={section.language}
                            theme={atomOneLight}
                            showLineNumbers={false}
                        />
                    </div>
                    :
                    <textarea id={`section${section.id}`} role="article" rows={5} name={`${section.id}`} value={section.content} onChange={writeCodeHandler} className="w-full border border-gray-300 py-2 px-3 rounded-lg"></textarea>

            }
            <label className="block font-semibold my-2">Description:</label>
            <input placeholder='what is this image about?' name={`${section.id}`} value={section.description} onChange={writeCodeDescriptionHandler} className="border border-gray-300 py-2 px-3 rounded-lg"></input>
        </div>
    )
}

export default CodeUploader