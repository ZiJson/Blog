import Image from "next/image"


const ImageContent = ({ publicUrl, description }:
    {
        publicUrl: string,
        description: string
    }) => {
    return (
        <div className=" w-3/4 group">
            <div className="w-full aspect-[5/4] relative">
                <Image src={publicUrl} priority={true} fill alt={description} className="rounded-xl object-cover shadow-xl group-hover:scale-[1.04] transition duration-300 group-hover:shadow-2xl" />
            </div>
            <div className="text-sm text-slate-400 m-2">
                {description}
            </div>
        </div>
    )
}
export default ImageContent