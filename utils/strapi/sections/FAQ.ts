type FaqItem = {
  attributes: {
    question: string;
    answer: string;
  };
};

export type FAQSection = {
  type: "ComponentSectionsFaqSection";
  title: string;
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
        faqs {
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
