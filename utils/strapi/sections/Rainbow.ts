import Outstanding from "@/components/sections/Outstanding";
import { StrapiImage } from "@/types/strapi/common";

type Outstanding = {
  title: string;
  content: string;
  outstandingContentVariant: "light" | "dark";
  outstandingImage: StrapiImage;
  outstandingImagePosition: "left" | "right";
  button: {label?:string, variant?:"primary"|"outlined"|"outlined_negative", iconName?:string, CTA:string, size?:"xs"|"sm"|"md"|"lg" }
  backgroundColor: string;
  backgroundWidth:"w_3_4"|"w_full"
};

export type RainbowSection = {
  type: "ComponentSectionsContainerRainbow";
  title: string;
  outstandings: Array<Outstanding>;
};

export const RAINBOW = `
...on ComponentSectionsContainerRainbow {
    title
    outstandings(pagination: {start: 0, limit: -1}) {
      title
      content
      outstandingContentVariant:contentVariant            
      outstandingImage:image {
        data {
          attributes {
            url
            alternativeText
          }
        }
      }            
      outstandingImagePosition:imagePosition
      button{
        label
        variant
        size
        iconName
        CTA
      }
      backgroundColor 
      backgroundWidth  
    }
}
`;