import type { LinkComponentConfig } from "@/types/LinkListComponentS";
import type { Card } from "@/utils/strapi/sections/CardList";

export type CardsDetailContentData = {
  type: 'ComponentSectionsCardsDetailContent';
  title: string;
  description: string;
  links: Array<LinkComponentConfig>;
  cards: Array <Card>;
  textPositionCardsDetailGroup: string;
};

export const CARDS_DETAIL_CONTENT = `
... on ComponentSectionsCardsDetailContent {
  title
  description
  links {
    text
    href
    target
    iconName
    iconPosition
    disabled
  }
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
  textPositionCardsDetailGroup: textPosition
}
`