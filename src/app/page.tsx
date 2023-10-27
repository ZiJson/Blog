import Image from 'next/image'
import Card from './_components/Card/Card'
import test from '@/app/_test/testPost.json'
import { Cols } from './_components/Card/Card';
import postcss from 'postcss';
import { getPosts } from '@/app/_controllers/serverController'
import { Title,Section } from './admin/page';
export interface Post {
  _id:string,
  title:Title,
  content:Section[],
  date:string
}

export default async function Home() {
  const posts = await getPosts()
  const cardTypeList: Cols[] = [];
  return (
    <div className='container flex flex-col gap-12 mx-auto px-24 pt-12 pb-12'>
      <div className='h-40 bg-slate-300'>
      </div>
      <div className='content grid grid-cols-3 gap-12'>
        {posts.map((post, index) => (<Card key={post._id.toString()} post={post} col={cardTypeList[index] ? cardTypeList[index] : "1"} />))}      </div>
      <div className='h-40 bg-slate-300'>
      </div>
    </div>
  )
}

