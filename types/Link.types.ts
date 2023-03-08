export type LinkConfig = {
  /**
   * link text
   */
  text: string;
  /**
   * Sizes: small | medium | large
   */
  size: string;
  /**
   * bold text
   */
  isBold: boolean;
  /**
   * deactivate label
   */
  disabled: boolean;
  /**
   * identifier
   */
  id?: string;
  /**
   * icon text
   */
  icon?: string;
  test?: string;
}

export type LinkData = {
  data: LinkConfig,
  onClick?: () => void;
}
