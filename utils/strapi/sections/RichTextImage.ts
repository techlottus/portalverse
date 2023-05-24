import { StrapiImage } from "@/types/strapi/common";

export type RichTextImageSection = {
  type: "ComponentSectionsRichTextImage";
  title: string;
  image: StrapiImage;
  text: string;
  imagePosition: "left" | "right";
  backgroundColor: string;
  richTextImageContentVariant: "light" | "dark";
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
  backgroundColor
  richTextImageContentVariant: contentVariant
}
`;