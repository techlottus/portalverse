import { StrapiImage } from "@/types/strapi/common";

export type ContactTargetCard = {
  name: string;
  email: string;
  phone: string;
  link: string;
  image: StrapiImage;
};

export type ContactTargetListSection = {
  __typename: "ComponentSectionsContactTargetList";
  title: string;
  subtitle: string;
  description: string;
  cards: Array<ContactTargetCard>;
};

export const CONTACT_TARGET_LIST = `
...on ComponentSectionsContactTargetList {
    __typename
    title
    subtitle
    description
    test:cards {
      name
      email
      phone
      link
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