export type OptionMenuGenericConfig = {
  label: string;
  route: string;
}

interface OptionMenuConfig extends OptionMenuGenericConfig {
  items: Array<OptionMenuGenericConfig>;
}

export default OptionMenuConfig