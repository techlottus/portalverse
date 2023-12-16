type FaqItem = {
  attributes: {
    question: string;
    answer: string;
  };
};

export type CategoryAccordionListData = {
  type: 'ComponentSectionsCategoryAccordionList';
  title: string;
  subtitle: string;
  CategoryList: Array<{
    label: string;
    iconName: string;
    faq_category: {
      data: {
        attributes: {
          faqs: {
            data: Array<FaqItem>;
          };
        };
      };
    };
  }>
};

export const CATEGORY_ACCORDION_CONTENT = `
... on ComponentSectionsCategoryAccordionList {
  title
  subtitle
  CategoryList {
    label
    iconName
    faq_category {
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
  }
}
`