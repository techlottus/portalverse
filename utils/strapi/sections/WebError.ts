import { LinkConfig } from "@/types/Link.types";
import { SeoData } from "./SEO";
import { Layout } from "@/utils/getLayout";


export type WebErrorSection = {
  type: 'ComponentSectionsWebError'
  title?: string;
  message?: string;
  errorCode?: string;
  button?: LinkConfig
};
export type WebErrorPage = {
  sections: Array<WebErrorSection>; 
  meta: SeoData,
  layoutData:Layout
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