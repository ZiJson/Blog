import { Storage } from "@google-cloud/storage";


export function connectToBucket() {
    const storage = new Storage({
        keyFilename: "next-blog-401914-14e6bed8e956.json"
    });
    const bucketName = "blog_picture"
    const bucket = storage.bucket(bucketName)
    return {bucket, storage}
    
}


