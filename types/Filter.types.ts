export interface ConfigFilter {
  label: string;
  icon?: string;
};

export interface OptionsFilter {
  value: string;
  active: boolean;
  label: string;
};

export type ConfigItemFilterComponent = {
  config: ConfigFilter;
  options: OptionsFilter[];
}

export type FilterComponentData = Record<string, ConfigItemFilterComponent | string>

interface FilterComponentConfig {
  data: FilterComponentData;
  color?: string;
  onSelectionItems: (filters: any) => void;
  onChangeView?: (status: boolean) => void;
}


export default FilterComponentConfig