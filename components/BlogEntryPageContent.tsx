import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ContentLayout from "@/layouts/Content.layout";
import Aspect from "@/components/Aspect";
import BannerPortalverseWrapper from "@/components/BannerPortalverseWrapper";
import Button from "@/old-components/Button/Button";
import Editor from "@/old-components/Editor";
import Image from "@/old-components/Image";
import type { BlogEntryPageEntity } from "@/utils/getBlogEntryPageData";

const BlogEntryPageContent = (props: BlogEntryPageEntity) => {
  const router = useRouter();

  const attributes = props?.data?.attributes;
  const parentSlug = attributes?.slug;

  const blogPost = attributes?.blogPost?.attributes;
  const blogPostBody = blogPost?.body as any;

  const blogPostImage = blogPost?.featured_image?.data?.attributes;
  const blogPostImageUrl = blogPostImage?.url;
  const blogPostImageAltText = blogPostImage?.alt;

  const banners = attributes?.sections;

  return (
    <Fragment>
      <Head>
        <title>{blogPost?.title}</title>
        {/* TODO: Add SEO */}
      </Head>
      <ContentLayout>
        {
          blogPost?.title
            ? <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:col-start-1 w-d:col-end-8">
                <p className="font-Poppins font-bold text-13 w-t:text-8.5 w-p:text-6 leading-[125%]">
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
              blogPostBody
                ? <div>
                    <Editor
                      readOnly
                      holder="editor"
                      value={blogPostBody}
                    />
                  </div>
                : null
            }
          </div>

          {/* TODO: Add related posts */}

          <div className="flex justify-center mt-12">
            <Button
              dark
              data={{
                title: "Ver más Artículos",
                type: "primary",
                icon: "",
                isExpand: false,
              }}
              onClick={() => {
                router.push(parentSlug || "/");
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
                      banners?.map((banner, i) => <BannerPortalverseWrapper key={i} data={banner} />)
                    }
                  </div>

                  {/** Dental clínic & CESEPCOM banner: Tablet & Mobile */}
                  <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 w-d:hidden">
                    {
                      banners?.map((banner, i) => <BannerPortalverseWrapper key={i} data={banner} />)
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
