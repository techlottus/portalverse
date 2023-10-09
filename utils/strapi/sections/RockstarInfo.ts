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
export const ROCKSTAR_INFO = `
... on ComponentSectionsRockstarInfo {
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
`;