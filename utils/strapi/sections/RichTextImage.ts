import { StrapiImage } from "@/types/strapi/common";

export type RichTextImageSection = {
   __typename: "ComponentSectionsRichTextImage";
  text: string;
  image: StrapiImage;
};
  
  export const BANNER = `
  __typename
  ...on ComponentSectionsRichTextImage{
    text
    image {
      data {
        attributes {
          url
        }
      }
    }
  }
  `;