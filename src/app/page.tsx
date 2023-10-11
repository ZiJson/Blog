import Image from 'next/image'
import Card from './_components/Card/Card'
import test from '@/app/_test/testPost.json'

export default function Home() {
  return (
    <div className='container flex flex-col gap-12 mx-auto px-24 pt-12 pb-12'>
      <div className='h-40 bg-slate-300'>
      </div>
      <div className='content grid grid-cols-3 gap-12'>
        {/* {test.posts.map((post,index)=>(<Card key={post.id} post={post} col={index==0?"2":index==3?"3":"1"}/>))} */}
        {test.posts.map((post,index)=>(<Card key={post.id} post={post} col={"1"}/>))}
      </div>
      <div className='h-40 bg-slate-300'>
      </div>
    </div>
  )
}
