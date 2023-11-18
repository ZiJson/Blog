import { getPost, getPosts } from '@/controllers/serverController'
import PostTitle from '@/components/PostTitle'
import TextContent from '@/components/TextContent'
import ImageContent from '@/components/ImageContent'
import CodeContent from '@/components/CodeContent'
import PostHeader from '@/components/PostHeader'
import { cache } from 'react'
import UserPannel from '@/components/admin/UserPannel'

export const dynamic = 'force-static'
export const revalidate = 43200;
const getCachedPost = cache(getPost);

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getCachedPost(params.slug);
  if (!post) return <div>Post doesn&apos;t exist</div>
  const { title, content, date } = post
  return (
    <>
      <div className='fixed z-50 pt-10'>
        <PostHeader />
      </div>
      <PostTitle title={title.title} imgUrl={title.publicUrl} />
      <div className='bg-white'>
        <div className='container flex flex-col items-center mx-auto  min-h-screen gap-6 md:gap-10 py-16 md:pt-12 px-4 md:px-20 lg:px-40 xl:px-80 '>
          {content.map((section) => (
            section.type == "text" ?
              <>
                {section.sectionTitle == "" ? "" : <div className=" w-full text-slate-700 leading-relaxed text-2xl font-bold tracking-wide">{section.sectionTitle}</div>}
                <TextContent key={section.id} text={section.content as string} />
              </>
              : section.type == "image" ?
                <ImageContent key={section.id} publicUrl={section.publicUrl as string} description={section.description as string} />
                : section.type == "code" ?
                  <CodeContent key={section.id} code={section.content} lenguage={section.language} description={section.description}/>
                  : null
          )

          )}
        </div>
      </div>
      <UserPannel inAdmin={false}/>
    </>
  )
}