import type { Card } from "@/utils/strapi/sections/CardList";
import type { VideoItem } from "@/utils/strapi/sections/Videos";

export type CardsVideoContentData = {
 type: 'ComponentSectionsCardsVideoContent';
 title: string;
 subtitle: string;
 cards: Array<Card>;
 textPositionCardsVideoContent: string;
 videoItem: VideoItem;
 button?: {
  label: string
  variant: string
  size: string
  CTA: string
  iconName: string
}};

export const CARDS_VIDEO_CONTENT = `
... on ComponentSectionsCardsVideoContent {
    title
    subtitle
    cards {
      title
      subtitle
      type
      content
      linkUrl
      linkText
      image {
        data {
          id
          attributes {
            alternativeText
            url
          }
        }
      }
      imageAspectRatio              
    }
    textPositionCardsVideoContent: textPosition
    videoItem {
     providerId
     provider
    }
    button {
      label
      variant
      size
      iconName
      CTA
    }
  }
`
