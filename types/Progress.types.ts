export type ProgressBarConfig = {
  /**
   * Identifier progress bar
   */
  title?: string;
  /**
   * The percentage that is changing
   */
  progress?: number;
  /**
   * The progress of the percentage
   */
  description?: string;
  /**
   * Button size
   * Sizes: small | medium
   */
  size?: string;
  /**
   * Flag to deactivate progress bar
   */
  disabled?: boolean;
}

type ProgressBarComponentData = {
  data?: ProgressBarConfig;
}

export default ProgressBarComponentData