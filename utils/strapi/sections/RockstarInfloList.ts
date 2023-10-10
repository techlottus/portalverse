import { StrapiImage } from "@/types/strapi/common";

export type RockstarInfoSection = {
  type: "ComponentSectionsRockstarInfo";
  name: string;
  image: StrapiImage;
  campus: {
    data: {
      attributes: {
        name: string;
      }
    }
  };
  detail: string;
}

export type RockstarInfoListSection = {
  type: "ComponentSectionsLinkList";
  title: string;
  description?: string;
  rockstars: Array<RockstarInfoSection>
};

export const ROCKSTARINFO_LIST = `
...on ComponentSectionsRockstarInfoList {
    title
    description
    rockstars(pagination:{ start: 0, limit: -1 }) {
      name
      detail
      campus {
        data {
          attributes {
            name
          }
        }
      }
      image {
        data {
          attributes {
            url
          }
        }
      }
    }
  }
`;