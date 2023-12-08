import { ObjectId } from "mongodb"
import { connectToDatabase } from "../utils/mongodb"
import { connectToBucket } from "../utils/gcp_storage"
import ServerSupabase from "@/utils/supabase/supabase.server"
import { Post } from "../app/page"
import { CommentTable, ProfileTable } from "@/utils/supabase/type"


export async function getPosts(): Promise<Post[]> {
    const { db } = await connectToDatabase()
    console.log("server")
    const posts = await db.collection('posts').find().sort({ date: -1 }).toArray()
    return posts.map((post) => ({ ...post, _id: post._id.toString() } as Post))
}

export const getPost = async (id: string): Promise<Post | null> => {
    if (id.length !== 24) return null;
    const _id = new ObjectId(id)
    const { db } = await connectToDatabase()
    const post = await db.collection('posts').findOne({ _id });
    if (!post) return null
    return {
        _id: post?._id.toString() as string,
        title: post.title,
        content: post.content,
        date: post.date
    }
}

export const getUserFromSession = async () => {
    const supabase = ServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) console.log(error);
    return user
}

export const getProfileFromId = async (id: string): Promise<ProfileTable> => {
    const supabase = ServerSupabase();
    let { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', id).limit(1).single()
    if (error) console.log(error)
    return data

}
export type CommentWithName = CommentTable & {
    profiles: {
        full_name: string
        avatar_url: string
    }
}
export const getComment = async (postId: string): Promise<CommentWithName[]> => {
    const supabase = ServerSupabase();

    let { data: comment, error } = await supabase
        .from('comment')
        .select('*, profiles(full_name, avatar_url)').eq('post_id', postId).order("created_at",{ascending:false})
    if (error) console.log(error)
    if (!comment) return []
    return comment
}