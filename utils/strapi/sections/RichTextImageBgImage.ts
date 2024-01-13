import { StrapiImage } from "@/types/strapi/common";
import { RichTextImageSection } from "./RichTextImage";

export type RichTextImageBgImageSection = {
  type: "ComponentSectionsRichTextImageBgImage"
  desktopBgImage?: StrapiImage;
  tabletBgImage?: StrapiImage;
  mobileBgImage?: StrapiImage;
  RichTextImageComponent: RichTextImageSection;
}

export const RICHTEXTIMAGE_BGIMAGE = `
... on ComponentSectionsRichTextImageBgImage {
  desktopBgImage {
    data {
      attributes {
        url
      }
    }
  }
  tabletBgImage {
    data {
      attributes {
        url
      }
    }
  }
  mobileBgImage {
    data {
      attributes {
        url
      }
    }
  }
  RichTextImageComponent:RichTextImage {
    title
    text
    contentVariant
    image {
      data {
        attributes {
          url
        }
      }
    }
    imagePosition
  }
}`;
