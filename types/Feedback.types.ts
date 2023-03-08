export type FeedbackConfig = {
  /**
  * Content of the properties on the left side
  */
  left?: SideIconsInterface;
  /**
   * Content of the properties on the right side
   */
  right?: SideIconsInterface;
  /**
   * Style type
   *
   * @example alert | modal | message
   */
  type?: string;
  /**
   * Flag to activate the text text on the right side
   */
  isTextEvent?: boolean;
  /**
   * Event text on the right side
   */
  textEvent?: string;
  /**
   * Tag output click on the right
   */
  tagOnRight?: string;
}

export type SideIconsInterface = {
  /**
  * Name of the material icon
  */
  name?: string;
  /**
  * Status indicating the color of the element
  */
  status?: string;
}

export type FeedbackData = {
  data: FeedbackConfig;
  children?: any;
  onRight?: () => void;
}