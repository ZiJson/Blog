import Image from 'next/image'
import pic from 'src/app/_components/Card/sample.jpeg'
import test from '../../_test/testPost.json'
import { Post } from '@/app/page'
import { getPost, getPosts } from '@/controllers/serverController'
import PostTitle from '@/components/PostTitle'
import TextContent from '@/components/TextContent'
import ImageContent from '@/components/ImageContent'
import Header from '@/components/Header'

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
    <>
      <div className='fixed top-0 left-16 z-50'>
        <Header dark={true}/>
      </div>
      <div>
        <PostTitle title={title.title} imgUrl={title.publicUrl} />
        <div className='container flex flex-col items-center gap-12 mx-auto px-80 pt-12 pb-12 min-h-screen'>
          {content.map((section) => (
            section.type == "text" ?
              <TextContent key={section.id} text={section.content as string} />
              :
              <ImageContent key={section.id} publicUrl={section.publicUrl as string} description={section.description as string} />
          )

          )}
        </div>
      </div>
    </>
  )
}