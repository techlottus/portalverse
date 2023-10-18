import { StrapiImage } from "@/types/strapi/common";

type Image = {
    image: StrapiImage;
    idImage: string;
}

  export type MosaicSection = {
    type: "ComponentSectionsMosaic";
    title: string;
    description: string;
    images: Array<Image>;
  };
  
  export const MOSAIC = `
  ...on ComponentSectionsMosaic {
    title
    description
    images(pagination:{start: 0, limit:-1}) {
      image {
        data {
          attributes {
            url
          }
        }
      }
    }
  }
  `;