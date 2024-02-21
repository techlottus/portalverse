type ColorCard = {
  headline: string;
  title: string;
  subtitle: string;
  description: string;
  classNames: string;
}

export type ColorCardListData = {
  type: "ComponentSectionsColorCardList"
  title: string;
  description: string;
  alternativeText: string;
  cards: Array<ColorCard>;  
}

export const COLOR_CARD_LIST = `
...on ComponentSectionsColorCardList{
  title
  description
  alternativeText
  cards {
    headline
    title
    subtitle
    description
    classNames
  }
}
`