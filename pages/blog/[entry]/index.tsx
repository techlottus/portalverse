import Head from "next/head"
import { useRouter } from "next/router"
import { env } from "process"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import  { fetchStrapi, replaceURL }  from "@/utils/getStrapi"
import ContentLayout from "@/layouts/Content.layout"
import Image from "@/old-components/Image"
import CardWebsite from "@/old-components/CardWebsite"
import Button from "@/old-components/Button/Button"
import Banner from "@/old-components/Banner"
import BannerWrapper from "@/old-components/BannerWrapper"
import Editor from "@/old-components/Editor"


const EntryBlogDetail: NextPageWithLayout = ({ blog_post, banners, related_post_title, blog_section }: any) => {
  
  const router = useRouter()
  const linkIcon = {
    "text": "Ver más",
    "iconSecond": "person",
    "isBold": true,
    "size": "large",
    "isUnderline": false,
    "disabled": false,
    "icon": "person"
  }

  return <>
    <Head>
    <title>{ blog_post?.seo.title }</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:col-start-1 w-d:col-end-8">
          <p className="font-Poppins font-bold text-13 w-t:text-8.5 w-p:text-6 leading-[125%]">{blog_post?.title}</p>
        </div>
        <div className="col-span-8 w-t:col-span-0 w-p:col-span-4">
          <Image
            alt={ blog_post.featured_image.alt }
            src={ blog_post.featured_image.src }
            classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
          />
          <div className="mt-6">
            <Editor readOnly holder="editor" value={blog_post.body} />
          </div>
          {
            !!blog_post?.related_posts.length && <>
              <div className="mt-[72px] w-t:mt-12 w-p:mt-12 mb-6">
                <p className="font-Poppins font-bold text-7.5 leading-[125%]">{related_post_title}</p>
              </div>
              <section className="col-span-8 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
                {
                blog_post.related_posts.map((item:any, i:number) => <section key={`section-blog-${i}`}>
                  <CardWebsite onClick={() => router.push(item.slug)} data={{...item, linkIcon, linkText:linkIcon, type: "vertical", wrapper:true}}/>
                </section>)
                }
              </section>
            </>
          }
          <div className="my-6 flex justify-center">
            <Button dark data={blog_section} onClick={()=>{router.push(blog_section.redirect)}}/>
          </div>
        </div>
        <div className="col-span-4 w-t:hidden w-p:hidden w-d:grid-cols-1">
          {
           banners.map((item:any, i:number) => <section className="mb-6" key={`section-blog-${i}`}>
            <BannerWrapper data={item} typeBanner={item.type} banner={item} font={item.font} onBtn={() => router.push(item.redirect)}/>
           </section>)
          }
        </div>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 w-d:hidden">
          {
           banners.map((item:any, i:number) => <section key={`section-blog-${i}`}>
            <Banner data={item} onBtn={() => router.push(item.redirect)}/>
           </section>)
          }
        </section>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
}

export async function getStaticPaths() {

  const rawblogpost = await fetchStrapi('blog-posts',['populate=*'])
  
  const fullblogposts = await rawblogpost.json()

  let slugs = fullblogposts.data.map((post: any) => {
    const { attributes: { slug } } = post
    return { params: { entry: slug } }
  })
  
  return {
    paths: slugs,
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: any) {

  const { params: { entry } } = context
  const rawblogpost = await fetchStrapi(`blog-posts`,['[populate][seo]=*','[populate][featured_image]=*','[populate][related_posts][populate][featured_image]=*',`filters[slug][$eq]=${entry}`])
    const blogposts = await rawblogpost.json()
    const pre_blog_post = blogposts.data[0].attributes
    const related_posts = pre_blog_post.related_posts.data.map((post: any) => {
      const url = post.attributes.featured_image?.data.attributes.formats.thumbnail.url || post.attributes.featured_image.data.attributes.url;
      const urlImage = replaceURL(url, "thumbnail")
      return { ...post.attributes, urlImage }
    })
    const featured_image = {
      alt: pre_blog_post.featured_image.data.attributes.alternativeText || pre_blog_post.featured_image.data.attributes.url ,
      src: replaceURL(pre_blog_post.featured_image)
    }
    const blog_post = { ...pre_blog_post, featured_image, related_posts}

    const { banners, related_post_title, blog_section } = await getDataPageFromJSON(`/blog/blog-entry.json`);
    return {
      props:{ blog_post, banners, related_post_title, blog_section},
      revalidate: 60
    }
}

export default EntryBlogDetail
