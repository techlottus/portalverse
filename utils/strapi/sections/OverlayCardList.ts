import { StrapiImage } from "@/types/strapi/common";

export type OverlayCard = {
  title: string;
  url: string;
  overlayColor: string;
  desktopImage: StrapiImage;
  mobileImage: StrapiImage;
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