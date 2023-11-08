import { connectToBucket } from "@/utils/gcp_storage"
const { bucket, storage } = connectToBucket()

interface imgBuffer {
    originalName: string,
    buffer: Buffer
}

export const uploadImage = (file: imgBuffer) => new Promise<string>((resolve, reject) => {
    const { originalName, buffer } = file

    const blob = bucket.file(originalName.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
        resumable: false
    })
    blobStream.on('finish', () => {
        const publicUrl = (
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        )
        resolve(publicUrl)
    })
        .on('error', (err) => {
            console.log(err)
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
})

export async function POST(req: Request) {
    const data = await req.formData()
    const files: File[] | null = data.getAll('file') as unknown as File[]
    // console.log(files)

    if (!files || files.length < 1) {
        return Response.json({ success: false })
    }
    else if (files.length == 1) {
        const bytes = await (files[0]).arrayBuffer()
        const buffer = Buffer.from(bytes)
        const img: imgBuffer = {
            "originalName": (files[0]).name,
            buffer
        }
        try {
            const resault = await uploadImage(img)
            return Response.json(resault, {
                status: 201
            })
        }
        catch (error) {
            return Response.json(error, {
                status: 500
            })
        }
    }

    let bufferFiles: imgBuffer[] = [];
    for (let file of files) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const img: imgBuffer = {
            "originalName": file.name,
            buffer
        }
        bufferFiles.push(img);
    }
    const promises: Promise<string>[] = [];
    bufferFiles.forEach((file: imgBuffer) => uploadImage(file))


    const resault = await Promise.all(promises).then(
        (values) => {
            console.log("resault:", values);
            return Response.json("upload successed", {
                status: 201
            })

        }
    ).catch(error => {
        console.log(error)
        return Response.json(`upload error:${error}`, {
            status: 500
        })
    })
    return resault

}