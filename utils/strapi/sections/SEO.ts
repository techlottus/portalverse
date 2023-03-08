import { StrapiImage } from "@/types/strapi/common";

type MetaSocial = {
  socialNetwork: string;
  title: string;
  description: string;
  image: StrapiImage;
};

export type SeoData = {
  metaTitle: string;
  metaDescription: string;
  metaImage: StrapiImage;
  metaSocial: Array<MetaSocial>;
  keywords: string;
  metaRobots: string;
  structuredData: string;
  metaViewport: string;
  canonicalURL: string;
};

export const SEO = `
seo {
  metaTitle
  metaDescription
  metaImage {
    data {
        attributes {
        url
      }
    }
  }
  metaSocial {
    socialNetwork
    title
    description
    image {
      data {
        attributes {
          url
        }
      }
    }
  }
  keywords
  metaRobots
  structuredData
  metaViewport
  canonicalURL
}
`;
