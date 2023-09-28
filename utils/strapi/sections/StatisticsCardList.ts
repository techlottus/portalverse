export type StatisticsCard = {
  title: string;
  body: string;
  maxNumber: number;
  prefix: string;
  suffix: string;
  iconName: string;
  color: string;
  variant: "neutral" | "stroke" | "shadow";
};

export type StatisticsCardListSection = {
  type: "ComponentSectionsStatisticsCardList";
  statisticsCards: Array<StatisticsCard>;
};

export const STATISTICS_CARD_LIST = `
...on ComponentSectionsStatisticsCardList {
  statisticsCards: cards(pagination: {start: 0, limit: -1}) {
    title
    body
    maxNumber
    prefix
    suffix
    iconName
    color
    variant
  }
}
`;