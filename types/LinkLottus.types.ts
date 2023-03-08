export type LinkIconsConfig = {
  /**
   * link text
   */
  text: string;
  /**
   * Sizes: small | medium | large
   */
  size: string;
  /**
   * underline text
   */
  isUnderline: boolean;
  /**
   * bold text
   */
  isBold: boolean;
  /**
   * disable label
   */
  disabled: boolean;
  /**
   * identifier
   */
  id?: string;
  /**
   * icon left text
   */
  iconFirst: string;
  /**
   * icon right text
   */
  iconSecond: string;
}


type LinkLottusComponentData = {
  data: LinkIconsConfig;
  onClick?: () => void;
}

export default LinkLottusComponentData