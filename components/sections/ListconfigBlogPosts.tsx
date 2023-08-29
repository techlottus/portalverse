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
              ? <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:mt-6 w-p:mt-6">
                  <p className="font-Poppins font-bold text-8.5 w-t:text-6 w-p:text-6 leading-[111%] w-t:leading-[125%] w-p:leading-[125%]">
                    {title}
                  </p>
                </div>
              : null
          }
          {
            blogPosts?.length > 0
              ? <div className="grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
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
