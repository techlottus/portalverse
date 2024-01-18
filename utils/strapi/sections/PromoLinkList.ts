type PromoLink = {
  text: string;
  link: string;
  color: string;
};

export type PromoLinkListSection = {
  type: "ComponentSectionsPromoLinkList";
  title: string;
  promoLinks: Array<PromoLink>;
  linkText?: string;
  linkUrl?: string;
};

export const PROMO_LINK_LIST = `
...on ComponentSectionsPromoLinkList {
  id,
  title,
  linkText:ctaText,
  linkUrl:ctaUrl,
  promoLinks(pagination: {start: 0, limit: -1}) {
    id,
    text,
    link,
    color
  }
}
`;