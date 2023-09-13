export type RichTextVideoConfig= {
  text: string;
  providerId:string;
  videoPosition:'left'|'right';
  provider:'Youtube'|'Vimeo';
}

export type RichTextImageData = {
  data: RichTextVideoConfig;
}