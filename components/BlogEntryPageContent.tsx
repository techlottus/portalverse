import Head from "next/head";
import { useRouter } from "next/router";
import ContentLayout from "@/layouts/Content.layout";
import Button from "@/old-components/Button/Button";
import Editor from "@/old-components/Editor";
import { BlogEntryPageEntity } from "@/utils/getBlogEntryPageData";
import { Fragment } from "react";
import BannerPortalverseWrapper from "@/components/BannerPortalverseWrapper";

const BlogEntryPage = (props: BlogEntryPageEntity) => {
  const blogPost = props?.data?.attributes?.blogPost?.attributes;
  const parentSlug = props?.data?.attributes?.slug;
  const router = useRouter();

  const banners = props?.data?.attributes?.sections;

  return (
    <Fragment>
      <Head>
        <title>{blogPost?.title}</title>
        {/* TODO: Add SEO */}
      </Head>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:col-start-1 w-d:col-end-8">
          <p className="font-Poppins font-bold text-13 w-t:text-8.5 w-p:text-6 leading-[125%]">
            {blogPost?.title}
          </p>
        </div>
        <div className="col-span-8 w-t:col-span-0 w-p:col-span-4">
          <img
            src={blogPost?.featured_image?.data?.attributes?.url || ""}
            alt={blogPost?.featured_image?.data?.attributes?.alt || ""}
          />
          {/* <Image
            alt={ blogPost?.featured_image?.data?.attributes?.alt || "" }
            src={ blogPost?.featured_image?.data?.attributes?.url || "" }
            classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
          /> */}
          <div className="mt-6">
            <Editor
              readOnly
              holder="editor"
              value={(blogPost?.body as any) || ""}
            />
          </div>

          {/* TODO: Add related posts */}

          <div className="my-6 flex justify-center">
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

        {banners?.length > 0 ? (
          <Fragment>
            {/** Dental clínic banner: Desk */}
            <div className="col-span-4 w-t:hidden w-p:hidden w-d:grid-cols-1 flex flex-col space-y-6">
              {banners?.map((banner) => (
                <BannerPortalverseWrapper data={banner} />
              ))}
            </div>

            {/** Dental clínic & CESEPCOM banner: Tablet & Mobile */}
            <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 w-d:hidden">
              {banners?.map((banner) => (
                <BannerPortalverseWrapper data={banner} />
              ))}
            </section>
          </Fragment>
        ) : null}
      </ContentLayout>
    </Fragment>
  );
};

export default BlogEntryPage;
