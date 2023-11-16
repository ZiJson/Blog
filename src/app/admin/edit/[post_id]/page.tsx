import { getPost } from "@/controllers/serverController"
import { headers } from "next/headers"
import PostEditor from "@/components/admin/PostEditor"


const Page =  async ({ params: { post_id } }: { params: { post_id: string } }) => {
    console.log(post_id)
    const post = await getPost(post_id)

    if (!post) return
    return (<PostEditor post={post} />)
}
export default Page