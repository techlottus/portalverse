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

  return (
    <Fragment>
      <Head>
        <title>{blogPost?.title}</title>
        {/* TODO: Add SEO */}
        <meta property="og:title" content={ blogPost?.seo?.metaTitle }/>
        <meta property="title" content={ blogPost?.seo?.metaTitle }/>
        <meta property="og:description" content={ blogPost?.seo?.metaDescription }/>
        <meta name="description" content={blogPost?.seo?.metaDescription} key="desc" />
        <meta property="og:image" content={blogPost?.seo?.metaImage?.data?.attributes?.url}/>
        <meta property="image" content={blogPost?.seo?.metaImage?.data?.attributes?.url}/>
      </Head>
      <ContentLayout>
        {
          blogPost?.title
            ? <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:col-start-1 w-d:col-end-8">
                <p className="font-headings font-bold text-13 w-t:text-8.5 w-p:text-6 leading-tight">
                  {blogPost?.title}
                </p>
              </div>
            : null
        }
        <div className="col-span-8 w-t:col-span-0 w-p:col-span-4">
          <div className="flex flex-col space-y-6">
            {
              blogPostImageUrl
                ? <Aspect ratio="2/1">
                    <Image
                      alt={ blogPostImageAltText || "" }
                      src={ blogPostImageUrl }
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

          <div className="w-p:hidden flex justify-center mt-12">
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
          <div className="w-d:hidden w-t:hidden mt-12">
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
                  <div className="col-span-4 w-t:hidden w-p:hidden w-d:grid-cols-1 flex flex-col space-y-6">
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
                        )}
                      )
                    }
                  </div>

                  {/** Dental clínic & CESEPCOM banner: Tablet & Mobile */}
                  <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 w-d:hidden">
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
                        )}
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
