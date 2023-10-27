import { connectToDatabase } from "@/app/_utils/mongodb"
import { stringify } from "querystring"
import { json } from "stream/consumers"

export async function POST(req: Request) {
  const { db } = await connectToDatabase()
  console.log("呼叫")

  const { title, content } = await req.json()

  const result = await db.collection('posts').insertOne({
    title,
    content,
    date: new Date().toISOString()
  })
  console.log("結果", result)
  return Response.json(result, {
    status: 201
  })
}

export async function GET() {
  const { db } = await connectToDatabase()
  const posts = await db.collection('posts').find().sort({date:-1}).toArray()
  return Response.json(posts)
}