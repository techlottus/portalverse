export type StrapiImage = {
  data: {
    attributes: {
      url: string;
      alternativeText?: string;
    };
  };
};
export type SocialMedias = {
    data: {
      attributes: {
        name: string
        icon_name: string;
        href: string
      }
    }
  }

export type TextPosition =
  | "center"
  | "center_top"
  | "center_bottom"
  | "left_top"
  | "left_center"
  | "left_bottom"
  | "right_top"
  | "right_center"
  | "right_bottom";

export type OverlayColor = "black" | "white" | "none";

export type ContentVariant = "dark" | "light";

export type StrapiButton = {label?:string, variant?:"primary"|"outlined"|"outlined_negative", iconName?:string, CTA:string, size?:"xs"|"sm"|"md"|"lg" }