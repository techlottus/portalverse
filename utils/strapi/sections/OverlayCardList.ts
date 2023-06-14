import type { StrapiImage } from "@/types/strapi/common";

export type OverlayCard = {
  title: string;
  url: string;
  overlayColor: string;
  image: StrapiImage;
};

export type OverlayCardListSection = {
  type: "ComponentSectionsOverlayCardList";
  title: string;
  overlayCards: Array<OverlayCard>;
};

export const OVERLAY_CARD_LIST = `
...on ComponentSectionsOverlayCardList {
  title
  overlayCards {
    title
    url
    overlayColor
    image {
      data {
        attributes {
          url
        }
      }
    }
  }
}
`;