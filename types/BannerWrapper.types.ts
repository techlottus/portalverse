import { BannerConfig, Image} from "@/types/Banner.types"
import { ButtonConfig } from "@/types/Button.types";

type BannerWrapperConfig = {
  /**
   * banner title
   */
  title?: string;
  /**
   * banner text
   */
  subtitle?: string;
  /**
   * banner state: black or none
   */
  description:string;
  state?: string;
  /**
   * banner font size: middle | large
   */
  size?: string;
  /**
   * Banner position middle
   */
  middle?: boolean;
  /**
   * Banner position center
   */
  center?: boolean;
  /**
   * Banner position bottom
   */
  bottom?: boolean;
  /**
   * Banner position left
   */
  left?: boolean;
  /**
   * Url image banner
   */
  urlImage: Image;
  /**
   * Overlay background black | white
   */
  overlayWhite: boolean;
  overlayDark: boolean;
  /**
   * Height banner
   */
  height?: string;
  /**
   * Action button
   */
  action: ButtonConfig;
}


type BannerWrapperData = {
  data: BannerWrapperConfig
  typeBanner: string;
  classNames?:string
  banner: BannerConfig;
  font: string;
  onBtn?: () => void;
}

export default BannerWrapperData