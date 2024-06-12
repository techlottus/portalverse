import { StrapiImage } from "@/types/strapi/common";
import { WebErrorSection } from "./WebError";
type privacyPolicy = {
  text: string;
  linkText: string;
  file: any;
  href?: string;
}
export type ContainerForm = {
  type: 'ComponentSectionsFormContainer'
  title: string;
  description?: string;
  image?: StrapiImage;
  extraText?: string;
  form: string;
  progress?: number;
  privacyPolicy? : privacyPolicy
  button?: {
    label: string
    variant: string
    size: string
    CTA: string
    iconName: string
    action?: () => () => void
  }
  errors?: WebErrorSection[],
  position?: string;
  width?: string;
  prefilledData?: any;
  options?: any
  shadow?: any
};

export const FORM_CONTAINER = `
...on ComponentSectionsFormContainer {
  title
  description
  image {
    data {
      attributes {
        url
      }
    }
  }
  extraText
  form
  progress
  privacyPolicy {
    text
    linkText
    file {
      data {
        attributes {
          url
        }
      }
    }
  }
  button {
    label
    variant
    size
    CTA
    iconName
  }
  errors {
    title
    message
    errorCode
    button {
      text
      href
      target
      iconName
      iconPosition
      disabled
    }
  }
  position
  width
  prefilledData
}
`;