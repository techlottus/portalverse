import type { StrapiImage } from "@/types/strapi/common";

type Card = {
  title: string;
  subtitle: string;
  type: string;
  content: string;
  linkText: string;
  linkUrl: string;
  image: StrapiImage;
  imageAspectRatio: string;
};

export type CardListSection = {
  type: "ComponentSectionsCardList",
  title: string;
  cards: Array<Card>;
};

export const CARD_LIST = `
...on ComponentSectionsCardList {
  id
  title
  cards {
    id
    title
    subtitle
    content
    type
    linkText
    linkUrl
    image {
      data {
        attributes {
          url
          alternativeText
        }
      }
    }
    imageAspectRatio
  }
}
`;