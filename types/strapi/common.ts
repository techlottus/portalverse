export type StrapiImage = {
  data: {
    attributes: {
      url: string;
      alt?: string;
    };
  };
};

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
