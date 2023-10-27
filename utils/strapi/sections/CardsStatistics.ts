import { Card } from "@/utils/strapi/sections/CardList";
import { StatisticsCard } from "@/utils/strapi/sections/StatisticsCardList";

export type CardsStatisticsData = {
  type: "ComponentSectionsCardsStatistics";
  title: string;
  description: string;
  cardsPosition: string;
  titleCards: string;
  descriptionCards: string;
  cards: Array<Card>;
  titleStatistics: string;
  descriptionStatistics: string;
  statistics: Array<StatisticsCard>;
}

export const CARD_STATISTICS = `
... on ComponentSectionsCardsStatistics {
  title
  description
  cardsPosition
  titleCards
  descriptionCards
  cards {
    title
    subtitle
    type
    content
    linkText
    linkUrl
    image {
      data {
        attributes {
          url
        }
      }
    }
    imageAspectRatio
  }
  titleStatistics
  descriptionStatistics
  statistics {
    title
    body
    prefix
    suffix
    maxNumber
    iconName
    color
    variant
  }
}
`;