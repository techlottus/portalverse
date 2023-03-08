import { ButtonConfig } from "@/types/Button.types";

export type BannerConfig = {
  /**
   * banner title
   */
  title: string;
  /**
   * banner text
   */
  subtitle: string;
  /**
   * banner state: black or none
   */
  state: string;
  /**
   * banner font size: middle | large
   */
  size: string;
  /**
   * Banner position middle
   */
  middle: boolean;
  /**
   * Banner position center
   */
  center: boolean;
  /**
   * Banner position bottom
   */
  bottom: boolean;
  /**
   * Banner position left
   */
  left: boolean;
  /**
   * Url image banner
   */
  urlImage: Image;
  /**
   * Overlay background black | white
   */
  overlay: string;
  /**
   * Height banner
   */
  height: string;
  /**
   * Action button
   */
  action?: ButtonConfig;
   /**
   * Mode wrapper
   */
  wrapper?: boolean;
}

export type Image = {
  mobile: string;
  desktop: string;
}

type BannerComponentData = {
  data: BannerConfig;
  noAction?: boolean;
  onBtn?: () => void;
}

export default BannerComponentData;