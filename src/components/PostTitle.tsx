import Image from "next/image"
import Background from "./BackGround";

type props = {
    title: string;
    imgUrl: string
}

const PostTitle = ({ title, imgUrl }: props) => {
    return (
        <div className="h-screen w-full m-auto relative flex flex-col-reverse">
            <div className="h-[95%] w-screen bg-slate-300 absolute -z-10 top-0 bg-fixed brightness-[.35]" style={{backgroundImage:`url(${imgUrl})`,backgroundSize:'cover',backgroundPosition: 'center'}}>
                {/* <Image src={imgUrl} alt="postTitle" fill className="object-cover" ></Image> */}
                {/* <div className="absolute w-full h-full z-10 bg-gradient-to-b from-transparent from-65% to-white"></div> */}
            </div>
            <div className=" px-96 mb-32 mx-auto text-white text-5xl font-black leading-snug tracking-wide">
                {title}
            </div>
        </div>
    )
}
export default PostTitle