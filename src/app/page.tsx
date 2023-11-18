import Image from 'next/image'
import Card from '../components/Card'
import { Cols } from '../components/Card';
import postcss from 'postcss';
import { getPosts } from '@/controllers/serverController'
import { PostTitle, Section } from '@/components/admin/PostEditor';
import { NormalHeader } from '@/components/Header';
import Background from '@/components/BackGround';
import UserPannel from '@/components/admin/UserPannel';

export type Post = {
  _id: string,
  title: PostTitle,
  content: Section[],
  date: string
}

export default async function Home() {
  const posts = await getPosts()
  const cardTypeList: Cols[] = [
    "2", "1", "1", "2"
  ];

  return (
    <>
      <Background />
      <div className='pl-8 pt-12 md:pl-20 lg:pl-48 md:pt-16'>
        <NormalHeader dark={false} />
      </div>
      <div className='container flex flex-col pt-20 lg:pt-36 px-8 mx-auto lg:px-24 pb-12 '>
        <div className='content sm:grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 '>
          {posts.map((post, index) => (<Card key={post._id.toString()} post={post} col={cardTypeList[index] ? cardTypeList[index] : "1"} />))}      </div>
      </div>
      <UserPannel inAdmin={false}/>
    </>
  )
}

