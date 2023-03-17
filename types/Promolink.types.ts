export type PromoLinkConfig = {
  /**
   * Background url image
   */
  urlImage: Image;
  /**
   * Promolink text
   */
  text: string;
  /**
   * Promolink icon
   */
  icon: string;
  /**
   * Promolink color
   */
  color: string;
  /**
   * Promolink opacity
   */
  opacity: string;
  /**
   * Promolink height
   */
  height: string;
  /**
   * Promolink status true | false
   */
  enable: boolean;
  /**
   * Background true | false
   */
  nobackground: boolean;
  isShadowColor?: boolean;
}

type Image = {
  mobile: string;
  desktop: string;
}

export type PromoLinkData = {
  data: PromoLinkConfig;
  classNames?: string;
  typeShadowColor?: string;
  shadowColor?: string | null;
  onClick?: () => void;
}