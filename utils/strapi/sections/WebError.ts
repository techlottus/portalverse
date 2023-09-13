import { LinkConfig } from "@/types/Link.types";
import { SEO, SeoData } from "./SEO";
import defaultRenderers from '@/utils/Renderers'
import { NotfoundSection } from "@/utils/getNotFoundPageData";


export type WebErrorSection = {
  title?: string;
  message?: string;
  error_code?: string;
  button: LinkConfig
};
export type WebErrorPage = {
  sections: Array<WebErrorSection>; 
  meta: SeoData
};

export const NOT_FOUND_SECTIONS = `
  sections {
    __typename
    ...on ComponentSectionsWebError {
      title
      message  
      button {
        href
        text
        iconName
        iconPosition
      }
    }
  }
`;
export const NotFoundPage = `
query NotFoundPage {
  notFoundPage {
    data {
      attributes {
        title
        slug
        ${NOT_FOUND_SECTIONS}
        ${SEO}
      }
    }
  }
}
`;