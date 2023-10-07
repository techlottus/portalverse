import { RockstarInfoSection } from "./RockstarInfo";

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
    rockstars(sort: "name:asc") {
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