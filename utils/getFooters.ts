import { LinkComponentConfig } from "@/types/LinkListComponentS";
import { SocialMedias, StrapiImage } from "@/types/strapi/common";
import { fetchStrapiGraphQL } from "@/utils/getStrapi";

export type FooterColumnItem = {
  label: string;
  href: string;
  bold: string;
  target: string;
}
export type FooterGroup = {
  title: string;
  href: string;
  target: string;
  items : Array<FooterColumnItem>
}
export type FooterColumn = {
  groups: Array<FooterGroup>
}
export type FooterSection = {
  title: string;
  logo: boolean;
  phone: {
    phone: number;
    icon_name: string;
  }
  images: {
    data: Array<StrapiImage>;
  }
  links: Array<LinkComponentConfig>
  position: string;
  social_medias: {
    data: Array<SocialMedias>
  }
  columns: Array<FooterColumn>

}
export type FooterData = {
  attributes: {
    name: string;
    footerSection: Array<FooterSection>
  };
};

export type Footers = {
  footers: {
    data: Array<FooterData>;
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
        images {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
        links {
          text
          href
          target
          iconName
          iconPosition
          disabled
        }
        position
        social_medias {
          data {
            name
            icon
            href
          }
        }
        columns {
          groups {
            label
            href
            target
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
}
`;

export default getFooters;
