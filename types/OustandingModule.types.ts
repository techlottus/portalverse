export type OustandingModuleConfig = {
  image: Image;
  title?: string;
  text: string;
  backgroundColor?: string;
  direction: string;
  contentVariant?: string;
}

export type Image = {
  mobile: string;
  desktop: string;
}

export type OustandingModuleData = {
  data: OustandingModuleConfig;
}