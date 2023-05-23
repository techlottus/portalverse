export type BoxShadowColor =
  | "blue_pastel_left"
  | "yellow_pastel_left"
  | "red_pastel_left"
  | "gray_pastel_left"
  | "blue_left"
  | "blue_pastel_right"
  | "yellow_pastel_right"
  | "red_pastel_right"
  | "gray_pastel_right"
  | "blue_right";

export type Card = {
  title: string;
  body: string;
  maxNumber: number;
  prefix: string;
  suffix: string;
  boxShadowColor: BoxShadowColor;
  icon: string;
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
    boxShadowColor
    icon
  }
}
`;