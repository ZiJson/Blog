import { getPost, getPosts } from '@/controllers/serverController'
import PostTitle from '@/components/PostTitle'
import TextContent from '@/components/TextContent'
import ImageContent from '@/components/ImageContent'
import PostHeader from '@/components/PostHeader'

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
        <PostHeader/>
      </div>
      <div>
        <PostTitle title={title.title} imgUrl={title.publicUrl} />
        <div className='container flex flex-col items-center mx-auto  min-h-screen gap-6 md:gap-10 py-16 md:pt-4 px-4 md:px-20 lg:px-80 '>
          {content.map((section) => (
            section.type == "text" ?
              <>
              {section.sectionTitle==""?"":<div className=" w-full text-slate-700 leading-relaxed text-2xl font-bold tracking-wide">{section.sectionTitle}</div>}
              <TextContent key={section.id} text={section.content as string} />
              </>
              :
              <ImageContent key={section.id} publicUrl={section.publicUrl as string} description={section.description as string} />
          )

          )}
        </div>
      </div>
    </>
  )
}