import Image from 'next/image'
import Card from '../components/Card'
import { Cols } from '../components/Card';
import postcss from 'postcss';
import { getPosts } from '@/controllers/serverController'
import { PostTitle, Section } from './admin/page';
import Header from '@/components/Header';
import Background from '@/components/BackGround';
export type Post = {
  _id: string,
  title: PostTitle,
  content: Section[],
  date: string
}

export default async function Home() {
  const posts = await getPosts()
  const cardTypeList: Cols[] = [
    "1","1",
    "1","1","1",
    "3"
  ];
  return (
    <>
      <Background/>
      <div className='container flex flex-col px-8 mx-auto lg:px-24 pb-12 '>
        <Header dark={false}/>
        <div className='content sm:grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 '>
          {posts.map((post, index) => (<Card key={post._id.toString()} post={post} col={cardTypeList[index] ? cardTypeList[index] : "1"} />))}      </div>
      </div>
    </>
  )
}

