import Image from 'next/image'
import pic from 'src/app/_components/Card/sample.jpeg'
import test from '../../_test/testPost.json'

export async function generateStaticParams() {
  const posts = ["1","2","3"]
 
  return posts.map((post) => ({
    slug: post,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  function findArrayElementByTitle(postList:any[], id:string) {
    return postList.find((element) => {
      return element.id === id;
    })
  }
  const post = findArrayElementByTitle(test.posts,params.slug)
  return (
    <div className='container flex flex-col gap-12 mx-auto px-24 pt-12 pb-12'>
      <div className='h-32 bg-slate-300'>{post.title}</div>
      <div className='px-36'>{post.content}</div>
      <div className='px-36'>{post.content}</div>
      <div className='px-36'>{post.content}</div>
      <div className='px-36'>{post.content}</div>
    </div>
  )
}