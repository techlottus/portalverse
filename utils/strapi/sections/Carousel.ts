
import { StrapiImage } from "@/types/strapi/common";
import { Card } from "./CardList";
import { VideoItem } from "./Videos";
import { button } from "./RichTextImage";

type mediaQueryImage = {
  desktopRatio: string;
  desktopImage: StrapiImage
  tabletRatio: string;
  tabletImage: StrapiImage;
  mobileRatio: string;
  mobileImage: StrapiImage;
}
export type CarouselData = {
  type: "ComponentSectionsCarousel"
  title: string;
  description: string;
  backgroundColor: string;
  origin: "center" | "auto",
  typeCarousel: "card" | "image" | "video";
  cards?: Array<Card>
  images?: Array<mediaQueryImage>
  videos?: Array<VideoItem>
  button?: button
}

export const CAROUSEL_SECTION = `
... on ComponentSectionsCarousel {
  title
  description
  typeCarousel: type
  backgroundColor
  origin
  button {
    label
    CTA
    variant
    size
  }
  cards(pagination: { start: 0, limit: -1 }) {
    title
    subtitle
    type
    content
    linkText
    linkUrl
    imageAspectRatio
    image {
      data {
        attributes {
          url
        }
      }
    }
  }
  videos(pagination: { start: 0, limit: -1 }){
    provider
    providerId
  }
  images(pagination: { start: 0, limit: -1 }) {
    desktopRatio
    desktopImage {
      data{
        attributes{
          url
        }
      }
    }
    tabletRatio
    tabletImage {
      data{
        attributes{
          url
        }
      }
    }
    mobileRatio
    mobileImage {
      data{
        attributes{
          url
        }
      }
    }
  }
}
`;