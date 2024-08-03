import { StrapiImage } from "@/types/strapi/common";

export type CardIconData= {
  IconName?:string;
  iconColor?:string;
  RichText?: string; 

}
export type BannerCardsData = {
  type: "ComponentSectionsBannerCards"
  cardIconItems: Array<CardIconData>;
  deskImage?: StrapiImage;
  tabletImage?: StrapiImage;
  mobileImage?: StrapiImage;
  overlayBannerCards?: string;
}

export const BANNER_CARDS = `
... on ComponentSectionsBannerCards{
  tabletImage{
    data{
      attributes{
        url
      }
    }
  }
  mobileImage{
    data{
      attributes{
        url
      }
    }
  }
  deskImage: desktopImage{
    data{
      attributes{
        url
      }
    }
  }
  overlayBannerCards: overlay
  cardIconItems: cardIconItem(pagination: {start: 0, limit: -1}){
    IconName
    iconColor
    RichText
  }
}`
