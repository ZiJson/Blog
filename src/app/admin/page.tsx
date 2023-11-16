import { getPosts } from "@/controllers/serverController"
import PostList from "@/components/admin/PostList"

export default async function Page() {
    const posts = await getPosts()
    return (
        <div className=" container mx-auto pt-20 px-40 min-h-[60vh]">
            <PostList posts={posts} />
        </div>
    )
}