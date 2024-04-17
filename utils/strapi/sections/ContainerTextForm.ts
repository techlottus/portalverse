import { ContainerForm } from './ContainerForm'
import { StrapiImage } from '@/types/strapi/common';

export type ContainerTextFormSection = {
  type: "ComponentSectionsContainerTextForm";
  title: string;
  title_accents: Array<string>
  description: any;
  outterForm: ContainerForm;
  desktopBgImage: StrapiImage
  tabletBgImage: StrapiImage
  mobileBgImage: StrapiImage
  desk: StrapiImage
  tab: StrapiImage
  mob: StrapiImage
};

export const CONTAINER_TEXT_FORM = `
... on ComponentSectionsContainerTextForm {
  title
  title_accents {
    accent
  }
  description
  desk : desktopBgImage {
    data {
      attributes {
        url
      }
    }
  }
  tab: tabletBgImage {
    data {
      attributes {
        url
      }
    }
  }
  mob: mobileBgImage {
    data {
      attributes {
        url
      }
    }
  }
  outterForm: form {
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
  }
}
`;
