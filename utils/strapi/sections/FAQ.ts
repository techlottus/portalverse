type FaqItem = {
  attributes: {
    question: string;
    answer: string;
  };
};

export type FAQSection = {
  type: "ComponentSectionsFaqSection";
  title?: string;
  ctaText: string;
  ctaUrl: string;
  component: "accordion" | "card" | "list";
  faqCategory: {
    data: {
      attributes: {
        faqs: {
          data: Array<FaqItem>;
        };
      };
    };
  };
};

export const FAQ_SECTION = `
...on ComponentSectionsFaqSection {
  title
  faqCategory {
    data {
      attributes {
        faqs(pagination:{start: 0, limit: -1}) {
          data {
            attributes {
              question
              answer
            }
          }
        }
      }
    }
  }
  ctaText
  ctaUrl
  component
}
`;
