export type TextContentSection = {
  type: "ComponentSectionsTextContent";
  title: string;
  subtitle: string;
  text: string;
};

export const TEXT_CONTENT = `
...on ComponentSectionsTextContent {
  title
  subtitle
  text
}
`;
