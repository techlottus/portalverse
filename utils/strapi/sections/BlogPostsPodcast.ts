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
  podcastItems {
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
  banners {
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
