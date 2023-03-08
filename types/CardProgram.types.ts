import { LinkIconsConfig } from "@/types/LinkLottus.types";
import ImageComponentData from "@/types/Image.types";

export type CardProgramData = {
  id?: string;
  title?: string;
  link: LinkIconsConfig;
  classNames?: string;
  image?: ImageComponentData;
  aspectImg?: string;
  onClick: () => void
}

export default CardProgramData;