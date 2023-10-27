import { ObjectId } from "mongodb"
import { connectToDatabase } from "../_utils/mongodb"
import { connectToBucket } from "../_utils/gcp_storage"
import { Post } from "../page"

export async function getPosts(): Promise<Post[]> {
    const { db } = await connectToDatabase()
    console.log("server")
    const posts = await db.collection('posts').find().sort({ date: -1 }).toArray()
    return posts.map((post) => ({ ...post, _id: post._id.toString() } as Post))
}

export async function getPost(id: string): Promise<Post | null> {
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
