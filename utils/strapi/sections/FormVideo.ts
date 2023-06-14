import { StrapiImage } from "@/types/strapi/common";

export type FormVideoSection = {
  type: "ComponentSectionsFormVideo";
  formTitle: string;
  formDescription: string;
  privacyPolicyText: string;
  privacyPolicy: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  formImage: StrapiImage;
  videoTitle: string;
  youtubeId: string;
};

export const FORM_VIDEO = `
... on ComponentSectionsFormVideo {
  formTitle
  formDescription
  privacyPolicyText
  privacyPolicy {
    data {
      attributes {
        url
      }
    }
  }
  formImage {
    data {
      attributes {
        url
        alternativeText
      }
    }
  }
  videoTitle
  youtubeId
}
`;
