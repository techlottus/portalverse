import { StrapiImage } from "@/types/strapi/common";

type LeaderboardLink = {
  text: string;
  href: string;
  target: "self" | "blank";
  iconName: string;
  iconPosition: "left" | "right";
  disabled: boolean;
};

export type LeaderboardSection = {
  type: "ComponentSectionsLeaderboard";
  title: string;
  subtitleIcon: string;
  subtitleText: string;
  links: Array<LeaderboardLink>;
  desktopImage: StrapiImage;
  tabletImage: StrapiImage;
  mobileImage: StrapiImage;
  leaderboardContentVariant: "light" | "dark"
  button?: {label?:string, variant?:"primary"|"outlined"|"outlined_negative", iconName?:string, CTA:string, size?:"xs"|"sm"|"md"|"lg" }
};

export const LEADERBOARD = `
...on ComponentSectionsLeaderboard {
  title
  subtitleIcon
  subtitleText
  links {
    text
    href
    target
    iconName
    iconPosition
    disabled
  }
  desktopImage {
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
  leaderboardContentVariant: contentVariant
  button{
    label
    variant
    size
    iconName
    CTA
  }
}
`;
