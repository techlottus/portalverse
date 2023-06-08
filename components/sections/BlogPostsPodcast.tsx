import { useRouter } from "next/router";
import Container from "@/layouts/Container.layout";
import BannerWrapper from "@/old-components/BannerWrapper";
import Button from "@/old-components/Button/Button";
import Spotify from "@/old-components/Spotify";
import BlogPostCardWrapper from "@/components/BlogPostCardWrapper";
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
        <div className="grid grid-cols-12-gap w-t:grid-cols-8-gap w-p:grid-cols-4-gap gap-grid-gap">
          {/* Blog Posts */}
          <div className="col-span-8 w-t:col-span-8 w-p:col-span-4">
            {
              listConfigData?.title
                ? <div className="mb-6">
                    <p className="font-Poppins font-bold text-10 w-t:text-7.5 w-p:text-7.5 leading-[125%]">
                      {listConfigData?.title}
                    </p>
                  </div> 
                : null
            }
            {
              blogPosts?.length > 0
                ? <div className="col-span-8 w-t:col-span-8 w-p:col-span-4 mb-6">
                    <div className="grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
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
                ? <div className="col-span-8 w-t:col-span-8 w-p:col-span-4 flex justify-center">
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

          {/* Podcast Sidebar */}
          <div className="col-span-4 w-t:col-span-8 w-p:col-span-4">
            {
              podcastItemsTitle
                ? <p className="font-Poppins font-bold text-10 w-t:text-7.5 w-p:text-7.5 leading-[125%] mb-6">
                    {podcastItemsTitle}
                  </p>
                : null
            }
            {
              podcastItems?.length > 0
                ? <div>
                    {
                      podcastItems?.map((podcastItem, i) => (
                        <div className="mb-6" key={`section-articles-${i}`}>
                          <Spotify
                            data={{
                              config: {
                                type: podcastItem?.podcastItem?.data?.attributes?.type,
                                id: podcastItem?.podcastItem?.data?.attributes?.providerId,
                                format: podcastItem?.format,
                              },
                            }}
                          />
                        </div>
                      ))
                    }
                  </div>
                : null
            }
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
                          className="mb-12 w-t:mb-6 w-p:mb-6 w-t:hidden"
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
                          className="mb-12 w-t:mb-6 w-p:mb-6 w-d:hidden w-p:hidden"
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
