export default function GCS_ImageKit_Loader({
    src,
    width
  }: {
    src: string
    width?: number
  }) {
    const imageName = src.split('blog_picture/')[1]
    return src.includes('blog_picture/')?`https://ik.imagekit.io/8hrc8aeif/${imageName}?tr=w-${width}`:src
  }