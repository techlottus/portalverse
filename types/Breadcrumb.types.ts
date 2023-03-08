export type BreadcumConfig = {
  /**
   * List of texts to show
   *
   * @example
   *
   * [{
   *  value: 'text1',
   *  text: 'Texto 1'
   * }}
   */
  textItems: Array<BreadCrumbItemInterface>;
  /**
   * Left icon name
   */
  icon: string;
  /**
   * Tag output click on a text
   */
  tagOnItem?: string;
  /**
   * Tag output click left icon
   */
  tagOnBack?: string;
  /**
   * Text color of breadcrumb
   */
  textColor?: string;
}

export type BreadCrumbItemInterface = {
  /**
   * Vale of text
   */
  value: string;
  /**
   * Text to show
   */
  text: string;
}

export type BreadcumData = {
  data: BreadcumConfig;
  onItem?: () => void;
  onBack?: () => void;
}