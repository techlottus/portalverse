import { LinkConfig } from "@/types/Link.types";
import { SeoData } from "./SEO";


export type WebErrorSection = {
  type: 'ComponentSectionsWebError'
  title?: string;
  message?: string;
  errorCode?: string;
  button?: LinkConfig
};
export type WebErrorPage = {
  sections: Array<WebErrorSection>; 
  meta: SeoData
};

export const WEB_ERROR = `
...on ComponentSectionsWebError {
  title
  message
  errorCode
  button {
    href
    text
    iconName
    iconPosition
  }
}
`;