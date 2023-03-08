export type OptionConfig = {
  name: string;
  search: string;
  disabled: boolean;
}

type OptionPillConfigComponent = {
  data: OptionConfig;
  active: boolean;
  onClick: (option: string) => void;
}

export default OptionPillConfigComponent
  