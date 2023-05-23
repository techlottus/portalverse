import { StrapiImage } from "@/types/strapi/common";

export type RichTextImageSection = {
  type: "ComponentSectionsRichTextImage";
  title: string;
  image: StrapiImage;
  text: string;
  imagePosition: "left" | "right";
};
  
export const RICH_TEXT_IMAGE = `
...on ComponentSectionsRichTextImage{
  title
  image {
    data {
      attributes {
        url
      }
    }
  }
  text
  imagePosition
}
`;