import { StrapiImage } from "@/types/strapi/common";

type IconText = {
  title: string;
  text: string;
  icon: string;
}

export type IconTextListImage = {
  type: "ComponentSectionsIconTextListImage";
  title: string;
  description: string;
  iconTextList: Array<IconText>
  positionImage: string;
  imageDesk: StrapiImage;
  tabletImage: StrapiImage;
  mobileImage: StrapiImage;
}

export const ICON_TEXT_LIST_IMAGE = `
... on ComponentSectionsIconTextListImage {
    title
    description
    iconTextList {
      title
      text
      icon:iconName
    }
    positionImage:imagePosition
    imageDesk: desktopImage {
      data {
        attributes {
          url
        }
      }
    }
    tabletImage {
      data {
        attributes {
          url
        }
      }
    }
    mobileImage {
      data {
        attributes {
          url
        }
      }
    }
  }
`;