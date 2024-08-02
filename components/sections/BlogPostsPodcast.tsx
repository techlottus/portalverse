import { useRouter } from "next/router";
import Container from "@/layouts/Container.layout";
import BannerWrapper from "@/old-components/BannerWrapper";
import Button from "@/old-components/Button/Button";
import BlogPostCardWrapper from "@/components/BlogPostCardWrapper";
import PodcastList from "@/components/sections/PodcastList";
import type { BlogPostsPodcastSection } from "@/utils/strapi/sections/BlogPostsPodcast";

const BlogPostsPodcast = (props: BlogPostsPodcastSection) => {
  const {
    blogPosts: listConfigData,
    ctaText,
    ctaUrl,
    podcastItemsTitle,
    podcastItems,
    banners,
  } = props;

  const router = useRouter();

  if(listConfigData?.relatesto !== "blogentries") return null;

  const blogPosts = listConfigData?.data?.blogPosts || [];
  const blogPageSlug = listConfigData?.data?.blogPageSlug;

  return (
    <section>
      <Container>
        <div className="grid grid-cols-12-gap tablet:grid-cols-8-gap mobile:grid-cols-4-gap gap-grid-gap">
          {/* Blog Posts */}
          <div className="col-span-8 tablet:col-span-8 mobile:col-span-4">
            {
              listConfigData?.title
                ? <div className="mb-6">
                    <h1 className="font-headings font-bold text-10 tablet:text-7.5 mobile:text-7.5 leading-tight">
                      {listConfigData?.title}
                    </h1>
                  </div> 
                : null
            }
            {
              blogPosts?.length > 0
                ? <div className="col-span-8 tablet:col-span-8 mobile:col-span-4 mb-6">
                    <div className="grid desktop:grid-cols-2 gap-6 tablet:grid-cols-2 mobile:grid-cols-1">
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
                  </div>
                : null
            }
            {
              ctaText && ctaUrl
                ? <div className="col-span-8 tablet:col-span-8 mobile:col-span-4 flex justify-center">
                    <Button
                      dark
                      data={{
                        id: "",
                        type: "primary",
                        title: ctaText,
                        size: "small",
                        icon: "",
                        lyIcon: false,
                        disabled: false,
                        isExpand: false,
                      }}
                      onClick={() => router.push(ctaUrl)}
                    />
                  </div>
              : null
            }
          </div>

          {/* Sidebar */}
          <div className="col-span-4 tablet:col-span-8 mobile:col-span-4 flex flex-col space-y-6">
            
            {/* Podcast Items */}
            {
              podcastItems?.length > 0
                ? <div className="w-d-base:-mx-6">
                    <PodcastList
                      type="ComponentSectionsPodcastList"
                      title={podcastItemsTitle}
                      podcastItems={podcastItems}
                    />
                  </div>
                : null
            }

            {/* Banners */}
            {
              banners?.length > 0
                ? <div>
                    {banners?.map((banner, i) => {
                      const bannerData = {
                        font: banner?.contentVariant,
                        type: "sm",
                        overlayWhite: banner?.overlay === "white",
                        overlayDark: banner?.overlay === "black",
                        title: banner?.title,
                        subtitle: banner?.subtitle,
                        state: "black",
                        size: "medium",
                        middle: false,
                        center: false,
                        bottom: false,
                        left: false,
                        urlImage: {
                          mobile: banner?.mobileImage?.data?.attributes?.url,
                          desktop: banner?.desktopImage?.data?.attributes?.url,
                        },
                        overlay:
                          !banner?.overlay || banner?.overlay === "none"
                            ? ""
                            : banner?.overlay,
                        height: "342px",
                        action: {
                          id: "",
                          type: "primary",
                          title: banner?.ctaText,
                          size: "small",
                          icon: "",
                          lyIcon: false,
                          disabled: false,
                          isExpand: false,
                          tagOnClick: "testClick",
                          test: "",
                        },
                        wrapper: true,
                        redirect: banner?.ctaUrl,
                        extern: banner?.ctaUrl?.includes("http"),
                      };

                      return (
                        <section
                          className="mb-12 tablet:mb-6 mobile:mb-6 tablet:hidden"
                          key={`section-podcast-${i}`}
                        >
                          <BannerWrapper
                            //@ts-ignore
                            data={bannerData}
                            banner={bannerData}
                            typeBanner={bannerData?.type}
                            font={bannerData.font}
                            onBtn={() =>
                              bannerData?.extern
                                ? window.open(bannerData.redirect, "_blank")
                                : router.push(bannerData.redirect)
                            }
                          />
                        </section>
                      );
                    })}
                    {banners?.map((banner, i) => {
                      const bannerData = {
                        font: banner?.contentVariant,
                        type: "sm",
                        overlayWhite: banner?.overlay === "white",
                        overlayDark: banner?.overlay === "black",
                        title: banner?.title,
                        subtitle: banner?.subtitle,
                        state: "black",
                        size: "medium",
                        middle: false,
                        center: false,
                        bottom: false,
                        left: false,
                        urlImage: {
                          mobile: banner?.mobileImage?.data?.attributes?.url,
                          desktop: banner?.desktopImage?.data?.attributes?.url,
                        },
                        overlay:
                          !banner?.overlay || banner?.overlay === "none"
                            ? ""
                            : banner?.overlay,
                        height: "342px",
                        action: {
                          id: "",
                          type: "primary",
                          title: banner?.ctaText,
                          size: "small",
                          icon: "",
                          lyIcon: false,
                          disabled: false,
                          isExpand: false,
                          tagOnClick: "testClick",
                          test: "",
                        },
                        wrapper: true,
                        redirect: banner?.ctaUrl,
                        extern: banner?.ctaUrl?.includes("http"),
                      };

                      return (
                        <section
                          className="mb-12 tablet:mb-6 mobile:mb-6 desktop:hidden mobile:hidden"
                          key={`section-podcast-${i}`}
                        >
                          <BannerWrapper
                            //@ts-ignore
                            data={bannerData}
                            banner={bannerData}
                            typeBanner=""
                            font={bannerData.font}
                            onBtn={() =>
                              bannerData?.extern
                                ? window.open(bannerData.redirect, "_blank")
                                : router.push(bannerData.redirect)
                            }
                          />
                        </section>
                      );
                    })}
                  </div>
                : null
            }
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogPostsPodcast;