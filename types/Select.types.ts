export type SelectConfig = {
  /**
   * Label value of the component
   */
  textDefault: string;
  /**
   * Flag to disable the component
   */
  disabled: boolean;
  /**
   * Name of icon
   */
  icon?: string;
  /**
   * title of seleect
   */
  isLabel?: boolean;
  /**
   * Flag for reset of the options
   */
  reset: boolean;
  zindexOptions: number;
  /**
   * Tag click event open list
   */
  tagOnClickList?: string;
  /**
   * Tag click event select option
   */
  tagOnClickOption?: string;
  test?: string;
}

export type SelectOptionConfig = {
  /**
   * Value of the option
   */
  value: string;
  /**
   * Text to show of the option
   */
  text: string;
  /**
   * Banner to activate your default selection
   */
  active: boolean;
  testItem?: string;
}

type SelectComponentData = {
  options: Array<SelectOptionConfig>;
  data: SelectConfig;
  flagHeight?: boolean;
  onClick: (value: CustomEvent) => void
}

export default SelectComponentData