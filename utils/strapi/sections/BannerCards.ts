import { StrapiImage } from "@/types/strapi/common";

export type CardIconData= {
  IconName?:string;
  iconColor?:string;
  RichText?: string; 
}
export type BannerCardsData = {
  type: "ComponentSectionsBannerCards"
  cardIconItem: Array<CardIconData>;
  desktopImage?: StrapiImage;
  tabletImage?: StrapiImage;
  mobileImage?: StrapiImage;
  overlay?: "none"|"dark"|"white";
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
      desktopImage{
        data{
          attributes{
            url
          }
        }
      }
      overlay
      cardIconItem(pagination: {start: 0, limit: -1}){
        IconName
        iconColor
        RichText
      }
}
`
