export type InputConfig = {
  /**
   * Value of the input title
   */
  label?: string;
  /**
   * Reference value of the INPUT
   */
  name?: string;
  /**
   * Name of the icon of the material Icons
   */
  icon?: string;
  /**
   * Maximum size of the input
   */
  maxlength?: string;
  /**
   * Allows or block paste in the input
   */
  onPaste?: boolean;
  /**
   * Placeholder of input
   */
  placeholder?: string;
  /**
   * Variable manage input state of autocomplete
   *
   * Example of usage:
   *
   * on: active
   * off: disabled
   */
  autocomplete?: string;
  /**
   * Flag to disabled the error status of the INPUT
   */
  disabled?: boolean;
  /**
   * Tipo de estilo de botones
   *
   * Options to use:
   * classic or outlined
   */
  typeButton?: 'classic' | 'outlined' | string;
  /**
   * Flag to restrict the input to just accept only letters
   */
  alphabetical?: boolean;
  /**
   * Flag to restrict the input to just accept letters and numbers
   */
  alphanumeric?: boolean;
  /**
   * Flag to restrict the input to just accept only numbers
   */
  onlyNumbers?: boolean;
  upperCase?: boolean;
  /**
   * Input type
   *
   * Example of usage
   * text | number | phone | email | ...
   *
   * All the values that accept the Tag Input
   */
  type?: string;
  /**
   * Value of pattern that can have the input
   */
  pattern?: string;
  iconLeft?: string;
  iconRight?: string;
  isRequired?: boolean;
  mask?: string;
  test?: string;
}

type InputComponentData = {
  data: InputConfig;
  value?: string;
  hasError?: boolean;
  errorMessage?: string;
  eventFocus?: () => void;
  eventKeyPress?: (e: any) => void;
  eventBlurPress?: () => void;
  listenIcon?: () => void;
};

export default InputComponentData