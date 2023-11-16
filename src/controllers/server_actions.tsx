'use server';
import { Post } from "@/app/page";
import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { PostTitle, Section } from "@/components/admin/PostEditor";
import ServerSupabase from "@/utils/supabase/supabase.server";
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";

const domain = new URL('https://zijasonblog.zeabur.app')


export const updatePost = async (post: Post) => {
    const { db } = await connectToDatabase();
    const objectId = new ObjectId(post._id)
    const result = await db.collection('posts').updateOne(
        { _id: objectId },
        {
            $set: {
                title: post.title,
                content: post.content
            }
        })
    console.log(

        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`

    );
    console.log(result)
    redirect('/admin')

}

export const createPost = async (title: PostTitle, content: Section[]) => {
    const { db } = await connectToDatabase()

    const result = await db.collection('posts').insertOne({
        title,
        content,
        date: new Date().toISOString()
    })
    console.log("結果", result)
    redirect('/admin')

}

export const deletePost = async (postId: string) => {
    const { db } = await connectToDatabase()
    const objectId = new ObjectId(postId)
    const result = await db.collection('posts').deleteOne({ "_id": objectId })
    console.log(result)
}

export const userLogin = async () => {
    const supabase = ServerSupabase()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // queryParams: {
            //     access_type: 'offline',
            //     prompt: 'consent',
            // },
            redirectTo: `${domain}/auth/callback?next=/admin`
        }
    })
    if (data.url) redirect(data.url)
}

export const userLogout = async () =>{
    const supabase = ServerSupabase();
    const {error} = await supabase.auth.signOut()
    if(error) console.error(error);

    redirect('/admin/login')
}
