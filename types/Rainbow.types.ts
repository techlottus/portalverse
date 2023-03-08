import ImageComponentData from "@/types/Image.types";

export type RainbowItemComponentConfig = {
  title: string;
  description: string;
  image: ImageComponentData;
  color?: string;
}

export type RainbowSectionComponentConfig = {
  sections: Array<RainbowItemComponentConfig>;
  color?: string;
}

export type StyleRainbowSectionItem = {
  backgroundImage?: string;
  backgroundColor?: string;
}

export type StyleRainbowSectionAll = {
  [ key: string ]: StyleRainbowSectionItem;
}

type RainbowComponentConfig = {
  sections: Array<RainbowSectionComponentConfig>;
  title: string;
  classNamesTitle?: string;
}

export default RainbowComponentConfig