export type CheckboxConfig = {
  /**
   * Reference value of the INPUT
   */
  name?: string;
  /**
  /**
   * checkbox disabled
   */
  disabled: boolean;
  /**
   * checkbox label
   */
  label?: string;
  /**
   * checkbox label
   */
  selected: boolean;
  /**
   * Tag output click on check
   */
  tagOnCheck?: string;
};

type CheckboxComponentData = {
  data: CheckboxConfig,
  onCheck: (evt: CustomEvent) => void;
}

export default CheckboxComponentData
  