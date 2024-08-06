import { StrapiImage } from "@/types/strapi/common";
import { VideoItem } from "./Videos";
import { button } from "./RichTextImage";

export type VideoImageData = {
  type: "ComponentSectionsGraduatesForm";
  title: string;
  subtitle: string;
  images: Array<any>
  video: VideoItem
  button: button
};

export const VIDEO_IMAGE = `
... on ComponentSectionsVideoImage {
  title
  subtitle            
  images {
    image {
      data {
        attributes {
          url
          alternativeText
        }
      }
    }                                      
  }
  video: Video {
    providerId
    provider
  }
  button: Button {
    label
    variant
    size
    CTA
    iconName
  }
}
`;
