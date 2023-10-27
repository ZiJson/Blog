import Image from 'next/image'
import pic from 'src/app/_components/Card/sample.jpeg'
import test from '../../_test/testPost.json'
import { Post } from '@/app/page'
import { getPost, getPosts } from '@/app/_controllers/serverController'

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    slug: post._id,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {

  const post = await getPost(params.slug);
  if (!post) return <div>Post doesn&apos;t exist</div>
  const { title, content, date } = post
  return (
    <div className='container flex flex-col items-center gap-12 mx-auto px-24 pt-12 pb-12'>

      <div className='h-32 w-full bg-slate-300'>{title.title}</div>
      {content.map((section) => (
        section.type == "text" ?
          <div className=' w-1/2'>{section.content}</div>
          :
          <Image src={section.publicUrl as string} priority={true} width={400} height={400} alt={section.description as string}></Image>
      )

      )}
    </div>
  )
}