export type Card = {
  title: string;
  body: string;
  maxNumber: number;
  prefix: string;
  suffix: string;
  color: string;
  iconName: string;
};

export type StatisticsCardListSection = {
  type: "ComponentSectionsStatisticsCardList";
  cards: Array<Card>;
};

export const STATISTICS_CARD_LIST = `
...on ComponentSectionsStatisticsCardList {
  cards {
    title
    body
    maxNumber
    prefix
    suffix
    color
    iconName
  }
}
`;