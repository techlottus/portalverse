import { StrapiImage } from "@/types/strapi/common";

export type OutstandingSection = {
  type: "ComponentSectionsOutstanding";
  title: string;
  content: string;
  outstandingContentVariant: "light" | "dark";
  outstandingImage: StrapiImage;
  outstandingImagePosition: "left" | "right";
  button: {label?:string, variant?:"primary"|"outlined"|"outlined_negative", iconName?:string, CTA:string, size?:"xs"|"sm"|"md"|"lg" }
  backgroundColor: string;
  backgroundWidth:"w_3_4"|"w_full"
};
  
export const OUTSTANDING = `
... on ComponentSectionsOutstandingRainbow {
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
`;