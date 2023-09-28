type itemsAccordion = {
  title: string;
  content: string;
};

export type AccordionSection = {
  type: "ComponentSectionsAccordion";
  title: string;
  subtitle: string;
  description: string;
  accordionItems: Array<itemsAccordion>;
};

export const ACCORDION_SECTION = `
...on ComponentSectionsAccordion {
  title
  subtitle
  description
  accordionItems(pagination: {start: 0, limit: -1}) {
    title
    content
  }
}
`;