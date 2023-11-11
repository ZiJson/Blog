import Image from "next/image"


const ImageContent = ({ publicUrl, description }:
    {
        publicUrl: string,
        description: string
    }) => {
    return (
        <div className=" w-3/4 group">
            <div className="w-full aspect-[5/4] relative">
                <Image
                    src={publicUrl}
                    alt={description}
                    fill
                    sizes="(min-width: 1540px) 672px, (min-width: 1280px) 480px, (min-width: 1040px) 528px, (min-width: 680px) 456px, calc(70.83vw - 12px)"
                    className="rounded-xl object-cover shadow-xl group-hover:scale-[1.04] transition duration-300 group-hover:shadow-2xl"
                />
            </div>
            <div className="text-sm text-slate-400 m-2">
                {description}
            </div>
        </div>
    )
}
export default ImageContent