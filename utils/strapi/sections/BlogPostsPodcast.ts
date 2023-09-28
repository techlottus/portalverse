import getBlogEntryPageData from "@/utils/getBlogEntryPageData";
import getBlogPosts from "@/utils/getBlogPosts";
import type { BannerData } from "@/utils/strapi/sections/Banner";
import type { ListconfigData } from "@/utils/strapi/sections/Listconfig";

type PodcastItemType = "playlist" | "episode" | "album" | "artist" | "track";
type PodcastItemFormat = "compact" | "normal";

type PodcastItem = {
  podcastItem: {
    data: {
      attributes: {
        providerId: string;
        publicationDate: string;
        type: PodcastItemType;
      };
    };
  };
  format: PodcastItemFormat;
};

export type BlogPostsPodcastSection = {
  type: "ComponentSectionsBlogPostsPodcast";
  blogPosts: ListconfigData;
  podcastItemsTitle: string;
  podcastItems: Array<PodcastItem>;
  ctaText: string;
  ctaUrl: string;
  banners: Array<BannerData>;
};

export const BLOG_POSTS_PODCAST = `
... on ComponentSectionsBlogPostsPodcast {
  blogPosts {
    title
    maxentries
    relatesto
    sortdate
  }
  podcastItemsTitle
  podcastItems(pagination: {start: 0, limit: -1}) {
    podcastItem {
      data {
        attributes {
          providerId
          publicationDate
          type
        }
      }
    }
    format
  }
  ctaText
  ctaUrl
  banners(pagination: {start: 0, limit: -1}) {
    desktopImage {
      data {
        attributes {
          url
        }
      }
    }
    mobileImage {
      data {
        attributes {
          url
        }
      }
    }
    tabletImage {
      data {
        attributes {
          url
        }
      }
    }
    title
    subtitle
    textPosition
    ctaUrl
    ctaText
    overlay
  }
}
`;

export const formatBlogPostsPodcastSection = async (
  section: BlogPostsPodcastSection
) => {
  const blogPostsConfig = section?.blogPosts;

  if (blogPostsConfig?.relatesto !== "blogentries")
    throw new Error(
      "BlogPostsPodcastSection must have its relatesto value set to 'blogentries'"
    );

  const blogEntryPage = await getBlogEntryPageData();

  const blogPostsData = await getBlogPosts({
    limit: blogPostsConfig?.maxentries,
    sort:
      blogPostsConfig?.sortdate === "latest"
        ? "publication_date:desc"
        : "publication_date:asc",
  });

  blogPostsConfig.data = {
    blogPageSlug: blogEntryPage?.data?.attributes?.slug,
    blogPosts: blogPostsData?.blogPosts?.data,
  };
  return section;
};