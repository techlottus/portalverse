import { StrapiButton, StrapiImage } from "@/types/strapi/common";

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
  overlayLeaderboard?: string;
  title: string;
  subtitleIcon: string;
  subtitleText: string;
  links: Array<LeaderboardLink>;
  desktopImage: StrapiImage;
  tabletImage: StrapiImage;
  mobileImage: StrapiImage;
  leaderboardContentVariant: "light" | "dark"
  button?: StrapiButton;
};

export const LEADERBOARD = `
...on ComponentSectionsLeaderboard {
  title
  subtitleIcon
  subtitleText
  overlayLeaderboard: overlay
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
