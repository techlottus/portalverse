import { LinkComponentConfig } from "@/types/LinkListComponentS";
import { SocialMedias, StrapiImage } from "@/types/strapi/common";
import { fetchStrapiGraphQL } from "@/utils/getStrapi";

export type FooterColumnItem = {
  label: string;
  href: string;
  bold: string;
  target: string;
}
export type FooterColumn = {
  items : Array<FooterColumnItem>
}
export type FooterSection = {
  title: string;
  logo: boolean;
  images: Array<StrapiImage>;
  links: LinkComponentConfig
  position: string;
  socialMedias: Array<SocialMedias>

}
export type Footer = {
  attributes: {
    name: string;
    footerSection: Array<FooterSection>
  };
};

export type Footers = {
  footers: {
    data: Array<Footer>;
  };
};

export const getFooters = async () => {
  const response = await fetchStrapiGraphQL<Footers>(
    FOOTERS
  );
  return response?.footers?.data;
};

export const FOOTERS = `
query Footers() {
  data {
    attributes {
      name
      footerSection {
        title
        logo
        images
        links {
          text
          href
          target
          iconName
          iconPosition
          disabled
        }
        position
        socialMedias {
          name
          icon
          href
        }
        columns {
          items {
            label
            href
            bold
            target
          }
        }
      }
    }
  }
}
`;

export default getFooters;
