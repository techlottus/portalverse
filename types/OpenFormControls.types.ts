export type OpenFormControlConfig = {
  hidden: boolean;
  value?: string;
} 

export type OpenFormControls = {
  level: OpenFormControlConfig,
  program: OpenFormControlConfig,
  modality: OpenFormControlConfig,
  campus: OpenFormControlConfig,
}