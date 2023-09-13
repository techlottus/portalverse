
export type RichTextVideoSection = {
  type: "ComponentSectionsRichTextVideo";
  title: string;
  text: string;
  providerId:string;
  provider:'Youtube'|'Vimeo';
  videoPosition: "left" | "right";
  backgroundColor: string;
  richTextVideoContentVariant: "light" | "dark";
};
  
export const RICH_TEXT_VIDEO = `
...on ComponentSectionsRichTextVideo{
  title
  text
  providerId
  provider
  videoPosition
  backgroundColor
  richTextVideoContentVariant: contentVariant
}
`;