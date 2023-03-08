export type ListconfigSection = {
  __typename: "ComponentSectionsListconfig";
  title: string;
  maxentries: number;
  relatesto: "blogentries" | "pages" | "faq";
  sortdate: "latest" | "earliest";
};

export const LIST_CONFIG = `
...on ComponentSectionsListconfig {
  __typename
  title
  maxentries
  relatesto
  sortdate
}
`;
