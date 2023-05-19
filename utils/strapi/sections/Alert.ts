import { StrapiImage } from "@/types/strapi/common";

export type AlertSection = {
   __typename: "ComponentSectionsAlert";
  title: string
  text: string;
  ctaUrl: string;
  linkText: string;
  iconLeft: string;
  iconContact: string;
};
  
  export const ALERT = `
  __typename
  ...on ComponentSectionsAlert {
    title
    text
    ctaUrl
    linkText
    iconLeft
    iconContact
  }
  `;