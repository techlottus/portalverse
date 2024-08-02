import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ContentLayout from "@/layouts/Content.layout";
import Aspect from "@/components/Aspect";
import BannerPortalverseWrapper from "@/components/BannerPortalverseWrapper";
import Button from "@/old-components/Button/Button";
import Editor from "@/old-components/Editor";
import Image from "@/old-components/Image";
import type { BlogEntryPageData } from "@/utils/getBlogEntryPageData";

const BlogEntryPageContent = (props: BlogEntryPageData) => {
  const router = useRouter();

  const attributes = props?.attributes;
  const parentSlug = attributes?.slug;

  const blogPost = attributes?.blogPost?.attributes;
  const blogPostBody = blogPost?.body as any;

  const blogPostImage = blogPost?.featured_image?.data?.attributes;
  const blogPostImageUrl = blogPostImage?.url;
  const blogPostImageAltText = blogPostImage?.alternativeText || "";

  const banners = attributes?.sections;

  const structuredData = JSON.stringify(blogPost?.seo?.structuredData)

  return (
    <Fragment>
      <Head>
        <title>{blogPost?.title}</title>
        {/* THIS DATA COMES FROM STRAPI SEO */}
        <meta property="title" content={blogPost?.seo?.metaTitle} />{/* metaTitle */}
        <meta name="description" content={blogPost?.seo?.metaDescription} key="desc" />{/* metaDescription */}
        <meta property="image" content={blogPost?.seo?.metaImage?.data?.attributes?.url} />{/* metaImage */}
        {/* metaSocial */}
        {/* ARRAY COULD BRING FACEBOOK OR TWITTER */}
        {
          blogPost?.seo?.metaSocial?.map((metasocial) => {
            if (metasocial?.socialNetwork === "Facebook") {
              return (
                <>
                  <meta property="og:title" content={metasocial?.title} />
                  <meta property="og:description" content={metasocial?.description} />
                  <meta property="og:image" content={metasocial?.image?.data?.attributes?.url} />
                </>
              )
            } if (metasocial?.socialNetwork === "Twitter") {
              return (
                <>
                  <meta property="twitter:title" content={metasocial?.title} />
                  <meta property="twitter:description" content={metasocial?.description} />
                  <meta property="twitter:image" content={metasocial?.image?.data?.attributes?.url} />
                </>
              )
            }
          })
        }
        {/* keywords */}
        <meta name="keywords" content={blogPost?.seo?.keywords} />
        {/* metaRobots */}
        <meta name="robots" content={blogPost?.seo?.metaRobots} />
        {/* metaViewport valor estático porque si lo trae de strapi en null deja de funcionar mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        {/* canonicalURL */}
        <link rel="canonical" href={blogPost?.seo?.canonicalURL} />
        {/* ogURL */}
        <meta property="og:url" content={blogPost?.seo?.canonicalURL} />
        {/* structuredData */}
        <script type="application/ld+json">{structuredData}</script>
      </Head>
      <ContentLayout>
        {
          blogPost?.title
            ? <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 desktop:col-start-1 desktop:col-end-8">
              <h1 className="font-headings font-bold text-13 tablet:text-8.5 mobile:text-6 leading-tight">
                {blogPost?.title}
              </h1>
            </div>
            : null
        }
        <div className="col-span-8 tablet:col-span-0 mobile:col-span-4">
          <div className="flex flex-col space-y-6">
            {
              blogPostImageUrl
                ? <Aspect ratio="2/1">
                  <Image
                    alt={blogPostImageAltText || ""}
                    src={blogPostImageUrl}
                    classNames="w-full h-full"
                    classNamesImg="w-full h-full object-cover"
                  />
                </Aspect>
                : null
            }
            {
              blogPostBody && <Editor
                readOnly
                holder="editor"
                value={blogPostBody}
              />
            }
          </div>

          {/* TODO: Add related posts */}

          <div className="mobile:hidden flex justify-center mt-12">
            <Button
              dark
              data={{
                title: "Ver más Artículos",
                type: "primary",
                icon: "",
                isExpand: false,
              }}
              onClick={() => {
                if (!parentSlug) return;
                router.push(parentSlug);
              }}
            />
          </div>
          <div className="desktop:hidden tablet:hidden mt-12">
            <Button
              dark
              data={{
                title: "Ver más Artículos",
                type: "primary",
                icon: "",
                isExpand: true,
              }}
              onClick={() => {
                if (!parentSlug) return;
                router.push(parentSlug);
              }}
            />
          </div>
        </div>

        {/* Sidebar */}
        {
          banners?.length > 0
            ? <Fragment>
              {/** Dental clínic banner: Desk */}
              <div className="col-span-4 tablet:hidden mobile:hidden desktop:grid-cols-1 flex flex-col space-y-6">
                {
                  banners?.map((banner, i) => {
                    return (
                      <BannerPortalverseWrapper
                        key={i}
                        data={banner}
                        onClick={() => {
                          const ctaUrl = banner?.ctaUrl;
                          if (!ctaUrl) return;
                          router.push(ctaUrl);
                        }}
                      />
                    )
                  }
                  )
                }
              </div>

              {/** Dental clínic & CESEPCOM banner: Tablet & Mobile */}
              <section className="col-span-12 tablet:col-span-8 mobile:col-span-4 grid desktop:grid-cols-2 gap-6 tablet:grid-cols-2 mobile:grid-cols-1 desktop:hidden">
                {
                  banners?.map((banner, i) => {
                    return (
                      <BannerPortalverseWrapper
                        key={i}
                        data={banner}
                        onClick={() => {
                          const ctaUrl = banner?.ctaUrl;
                          if (!ctaUrl) return;
                          router.push(ctaUrl);
                        }}
                      />
                    )
                  }
                  )
                }
              </section>
            </Fragment>
            : null
        }
      </ContentLayout>
    </Fragment>
  );
};

export default BlogEntryPageContent;
