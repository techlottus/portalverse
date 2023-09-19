import { StrapiImage } from "@/types/strapi/common";

export type OutstandingSection = {
  type: "ComponentSectionsOutstanding";
  title: string;
  content: string;
  contentVariant: "light" | "dark";
  image: StrapiImage;
  imagePosition: "left" | "right";
  button: {label?:string, variant?:"primary"|"outlined"|"outlined_negative", iconName?:string, CTA:string, size?:"xs"|"sm"|"md"|"lg" }
  backgroundColor: string;
  backgroundWidth:"outstanding"|"rainbow"
};
  
export const OUTSTANDING = `
... on ComponentSectionsOutstandingRainbow {
  title
  content
  contentVariant            
  image {
    data {
      attributes {
        url
      }
    }
  }            
  imagePosition
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