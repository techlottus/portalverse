import { StrapiImage } from "@/types/strapi/common";

export type button = {
  CTA: string;
  label: string;
  iconName: string;
  variant: string;
  id: string;
  size: string;
};
export type RichTextImageSection = {
  type: "ComponentSectionsRichTextImage";
  title: string;
  image: StrapiImage;
  text: string;
  imagePosition: "left" | "right";
  backgroundColor: string;
  richTextImageContentVariant: "light" | "dark";
  buttons?: Array<button>;
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
  richTextImageContentVariant: contentVariant,
  buttons {
    CTA
    label
    iconName
    variant
    id
    size
  }
}
`;
