import type { StrapiImage } from "@/types/strapi/common";
import { RichTextImageSection } from "./RichTextImage";
import { RichTextVideoSection } from "./RichTextVideo";

export type Tab = {
  title: string;
  content:string;
  richtextImage?:Array<RichTextImageSection>
  richtextVideo?:Array<RichTextVideoSection>
};

export type TabList = {
  type: "ComponentOrganismsTabList",
  tabs: Array<Tab>;
};

export const TABS_LIST = `
... on ComponentOrganismsTabList{
          tabs(pagination: {start: 0, limit: -1}){
            title
            content
            richtextImage(pagination: {start: 0, limit: -1}){
              title
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              text
              imagePosition
              backgroundColor
              richTextImageContentVariant: contentVariant,
              buttons {
                CTA
                label
                iconName
                variant
                id
                size
              }
            }
            richtextVideo(pagination: {start: 0, limit: -1}){
              title
              text
              providerId
              provider
              videoPosition
              backgroundColor
              richTextVideoContentVariant: contentVariant
              buttons {
                CTA
                label
                iconName
                variant
                id
                size
              }
            }
          }
}
      
`;