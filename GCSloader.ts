export default function GCS_ImageKit_Loader({
    src,
    width
  }: {
    src: string
    width?: number
  }) {
    const imageName = src.split('blog_picture/')[1]
    return `https://ik.imagekit.io/8hrc8aeif/${imageName}?tr=w-${width}`
  }