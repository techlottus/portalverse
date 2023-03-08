import ImageComponentData from "@/types/Image.types";
import OptionMenuConfig from "@/types/Header.menus.types";

type HeaderPortalverseComponentData = {
  classNames?: string;
  onClickLogo: () => void;
  logotype: ImageComponentData;
  onClickCTA: () => void;
  menus: Array<OptionMenuConfig>;
  menusMobile: Array<any>;
}

export default HeaderPortalverseComponentData