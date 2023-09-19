import { LinkConfig } from "@/types/Link.types";
import { SeoData } from "./SEO";


export type ContainerForm = {
  type: 'ComponentSectionsFormContainer'
  title?: string;
  message?: string;
  error_code?: string;
  button: LinkConfig
};

export const WEB_ERROR = `
...on ComponentSectionsFormContainer {
  title
  message  
  button {
    href
    text
    iconName
    iconPosition
  }
}
`;