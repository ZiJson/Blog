'use server';
import { Post } from "@/app/page";
import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { PostTitle, Section } from "@/components/admin/PostEditor";
import ServerSupabase from "@/utils/supabase/supabase.server";
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'




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

export const userLogin = async (fomrData:FormData) => {
    const headersList = headers();
    const next = fomrData.get('next')
    console.log("next:",next)
    let host = headersList.get('host'); // to get domain
    const domain = (host?.includes('localhost:') ? "http://" : "https://") + host
    const supabase = ServerSupabase()
    console.log("env_domain:", domain)
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            // redirectTo: `${domain}/admin`
            redirectTo: `${domain}/auth/callback?next=${next}`
        }
    })
    if(error) console.error("error:",error)
    if (data.url) redirect(data.url)
}

export const userLogout = async (formData:FormData) => {
    const next = formData.get('next') as string ?? '/'
    const supabase = ServerSupabase();
    const { error } = await supabase.auth.signOut()
    if (error) console.error(error);

    redirect(next)
}
