import Image from "@/types/Image.type";
import ButtonComponentData, { ButtonConfig } from "./Button.types";
import { YoutubeDimensions } from "./Youtube.types";

export type BannerPortalverseConfig = {
  image?: Image;
  title?:string;
  subtitle?:string;
  position?:string;
  height?: string;
  overlayWhite?: boolean;
  overlayDak?: boolean
  button: ButtonConfig
  noAction:boolean;
  dimensions?: Array<string>;
  font: string;
  variant?: "sm" | "md" | "lg";
  desktopRatio?: string;
  tabletRatio?: string;
  mobileRatio?: string;
}

type BannerPortalverseComponentData = {
  classNames?: string;
  data: BannerPortalverseConfig;
  onClick?: ()=>void
}

export default BannerPortalverseComponentData