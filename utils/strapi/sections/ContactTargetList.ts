import { StrapiImage } from "@/types/strapi/common";

export type ContactTargetCard = {
  image: StrapiImage;
  title: string;
  email: string;
  phone: string;
  link: string;
};

export type ContactTargetListSection = {
  type: "ComponentSectionsContactTargetList";
  title: string;
  subtitle: string;
  description: string;
  cards: Array<ContactTargetCard>;
};

export const CONTACT_TARGET_LIST = `
...on ComponentSectionsContactTargetList {
    title
    subtitle
    description
    cards {
      image {
        data {
          attributes {
            url
          }
        }
      }
      title
      email
      phone
      link
    }
  }
`;