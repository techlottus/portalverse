import { useRouter } from "next/router";
import Container from "@/layouts/Container.layout";
import BlogPostCardWrapper from "@/components/BlogPostCardWrapper";
import type { ListconfigData } from "@/utils/strapi/sections/Listconfig";

const ListconfigBlogPosts = (props: ListconfigData) => {
  const { title, relatesto, data } = props;
  const router = useRouter();

  if (relatesto !== "blogentries") return null;

  const blogPosts = data?.blogPosts || [];
  const blogPageSlug = data?.blogPageSlug;

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {
            title
              ? <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 tablet:mt-6 mobile:mt-6">
                  <h1 className="font-headings font-bold text-8.5 tablet:text-6 mobile:text-6 semi-tight tablet:leading-tight mobile:leading-tight">
                    {title} 
                  </h1>
                </div>
              : null
          }
          {
            blogPosts?.length > 0
              ? <div className="grid desktop:grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1">
                  {
                    blogPosts?.map((blogPost, i) => (
                      <div key={`section-blog-${i}`}>
                        <BlogPostCardWrapper
                          onClick={() =>
                            router.push(`${blogPageSlug}/${blogPost.attributes.slug}`)
                          }
                          data={{
                            ...blogPost,
                          }}
                        />
                      </div>
                    ))
                  }
                </div>
              : null
          }
        </div>
      </Container>
    </section>
  );
};

export default ListconfigBlogPosts;
