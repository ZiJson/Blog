
import { connectToDatabase } from "@/utils/mongodb"

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