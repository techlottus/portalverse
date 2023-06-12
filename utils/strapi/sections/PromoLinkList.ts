type PromoLink = {
  text: string;
  link: string;
  color: string;
};

export type PromoLinkListSection = {
  type: "ComponentSectionsPromoLinkList";
  title: string;
  promoLinks: Array<PromoLink>;
};

export const PROMO_LINK_LIST = `
...on ComponentSectionsPromoLinkList {
  id,
  title,
  promoLinks {
    id,
    text,
    link,
    color
  }
}
`;