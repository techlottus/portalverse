import { ButtonConfig } from "@/types/Button.types";
import { StrapiImage } from "@/types/strapi/common";

type FaqItem = {
  attributes: {
    question: string;
    answer: string;
  };
};

export type FAQSection = {
  type: "ComponentSectionsFaqSection"
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
export type FaqImageSection = {
  type: "ComponentSectionsFaqImage";
  title?: string;
  image?: StrapiImage;
  imgPosition?: "left" | "right";
  faq?: FAQSection;
  button?: ButtonConfig & {CTA:string};
}

export const FAQ_IMAGE = `
...on ComponentSectionsFaqImage {
  title
  image{
    data{
      attributes{
        url
      }
    }
  }
  imgPosition
  faq{
    faqCategory {
      data {
        attributes {
          title
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
  button{
    size
    title:label
    CTA
    iconName
    type:variant
  }
}
`;
