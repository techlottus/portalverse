export type ListconfigSection = {
  type: "ComponentSectionsListconfig";
  title: string;
  maxentries: number;
  relatesto: "blogentries" | "pages" | "faq";
  sortdate: "latest" | "earliest";
};

export const LIST_CONFIG = `
...on ComponentSectionsListconfig {
  title
  maxentries
  relatesto
  sortdate
}
`;
