export type ButtonConfig = {
  /**
   * Button identifier
   */
  id?: string;
  /**
   * Type of style of the button
   *
   * Types: primary | secondary | outlined | text
   */
  type?: string;
  /**
   * Botton text
   */
  title?: string;
  /**
   * Button size
   *
   * Sizes: small | medium | large
   */
  size?: string;
  /**
   * Name of icon
   */
  icon?: string;
  /**
   * The button with icon and without text
   */
  lyIcon?: boolean;
  /**
   * flag to deactivate the button
   */
  disabled?: boolean;
  /**
   * Flag to expand Button to 100%
   */
  isExpand?: boolean;
  /**
   * Tag output click button
   */
  tagOnClick?: string;
  test?: string;
}

type ButtonComponentData = {
  data: ButtonConfig;
  dark?: boolean; 
  darkOutlined?: boolean;
  onClick?: () => void;
}

export default ButtonComponentData;
  