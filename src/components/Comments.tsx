import { CommentWithName, getComment, getUserFromSession } from "@/controllers/serverController";
import { addComment } from "@/controllers/server_actions";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Divider from "./Divider";
type props = {
    data: CommentWithName[];
    postId: string
}

export default async function Comments({ data: comments, postId }: props) {
    const user = await getUserFromSession();
    console.log(comments)
    return (
        <div className="bg-white w-[90%] mt-20 px-10 pt-6 pb-8 rounded-2xl border border-gray-200 shadow-xl relative flex flex-col gap-6">
            <div className="w-full text-lg font-bold text-gray-700 ">
                Comments
                <span className="ml-2 font-medium text-base text-slate-400">{comments.length}</span>
            </div>
            {
                user ?
                    <div className="flex gap-6 ">
                        <Image src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name} width={30} height={30} className="rounded-full object-cover h-[30px] w-[30px] grayscale " />
                        <form action={addComment} className="w-4/5">
                            <input type="text" name="post_id" readOnly value={postId} hidden />
                            <input type="text" name="user_id" readOnly value={user.id} hidden />
                            <textarea name="comment" rows={3} className="w-full border bg-gray-100 rounded-lg p-2" />
                            <button type="submit" className="text-lg font-semibold hover:text-gray-700 text-gray-500 absolute top-6 right-10">Add Comment</button>
                        </form>
                    </div>
                    : null
            }
            {comments.map((comment, index) => {
                return (
                    <div key={comment.id} className={`flex gap-2 flex-col w-full  pb-3 ${index < comments.length - 1 ? "border-b-2" : null}`}>
                        <div className="flex justify-between items-center text-gray-400">
                            <div className="flex justify-start items-center gap-4">
                                <Image src={comment.profiles.avatar_url} alt="comment" width={30} height={30} className="rounded-full object-cover h-[30px] w-[30px] grayscale" />
                                <div>
                                    {comment.profiles.full_name}
                                </div>
                            </div>
                            {
                                (() => {
                                    const data = new Date(comment.created_at);
                                    return (
                                        <div className=" justify-self-end text-sm">
                                            {data.toLocaleDateString()}
                                        </div>
                                    )
                                })()
                            }
                        </div>
                        <div className="w-full px-20 text-gray-700">
                            {comment.text}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}