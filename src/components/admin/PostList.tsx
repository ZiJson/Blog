import { Post } from "@/app/page"
import Image from "next/image"
import edit_icon from "../../../public/btn_icon/edit.svg"
import Link from "next/link"
import { deletePost } from "@/controllers/server_actions"
import { revalidatePath } from "next/cache"

type props = {
    posts: Post[]
}

const PostList = ({ posts }: props) => {

    return (
        <>
            <div className="text-4xl font-bold text-slate-600 my-10 text-center">
                Existing Posts
            </div>
            <div className="flex flex-col gap-4 items-center">
                <div className="w-[80%] flex justify-end">
                    <Link href='/admin/edit' className="w-fit flex items-center gap-1 bg-slate-200 text-slate-700 font-semibold p-2 rounded-lg hover:bg-slate-300 shadow-lg  border border-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>
                            new post
                        </span>
                    </Link>
                </div>
                {posts.map((post) => (
                    <div className="flex group w-full justify-center items-center " key={post._id}>
                        <div className="divide-x border w-[80%] border-slate-200 p-2 py-3 rounded-lg shadow-lg flex bg-white group-hover:bg-slate-50">
                            <div className=" min-w-[90px] text-slate-500">
                                {(new Date(post.date)).toLocaleDateString()}
                            </div>
                            <div className=" pl-1 line-clamp-1 font-medium text-slate-700">
                                {post.title.title}
                            </div>
                        </div>
                        <div className=" text-slate-500 overflow-hidden flex items-center  gap-1 max-w-0 group-hover:max-w-6xl transition-all bg-slate-200 duration-300 rounded-r-lg shadow-lg ">
                            <Link href={`/post/${post._id}`} title="link to post" className="hover:text-slate-800 pl-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                            </Link>
                            <Link href={`/admin/edit/${post._id}`} title="edit" className="hover:text-slate-700 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </Link>
                            <form  title="delete" className="flex justify-center items-center text-red-400 hover:text-red-700 py-[0.3rem] pr-1">
                                <button formAction={async () => {
                                    'use server';
                                    await deletePost(post._id);
                                    revalidatePath('/admin')
                                }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                )
                )}
            </div>
        </>
    )
}

export default PostList