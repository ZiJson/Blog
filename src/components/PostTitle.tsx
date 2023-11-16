import Image from "next/image"
import Background from "./BackGround";

type props = {
    title: string;
    imgUrl: string
}

const PostTitle = ({ title, imgUrl }: props) => {
    return (
        <div className="md:min-h-screen">
            <div className="h-[60vh] md:h-[95vh] w-full m-auto flex flex-col-reverse overflow-hidden ">
                <div
                    className="w-full h-[60vh] md:h-[95vh]  fixed bg-slate-800 -z-10 top-0  brightness-[.35] "
                // style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <Image src={imgUrl} alt="postTitle" fill priority sizes="100vw" className="object-cover" />
                    {/* <div className="absolute w-full h-full z-10 bg-gradient-to-b from-transparent from-65% to-white"></div> */}
                </div>
                <div className="text-white font-black leading-snug tracking-wide text-4xl md:text-5xl pb-6 md:pb-20 px-8 md:px-60">
                    {title}
                </div>
            </div>
        </div>
    )
}
export default PostTitle