export type OptionDropdownItem = {
  value: string;
  active: boolean;
  label: string;
};

export type FilterDropdownConfig = {
  label: string;
  icon?: string;
};

type FilterDropdownComponentData = {
  data: {
    config: FilterDropdownConfig;
    options: OptionDropdownItem[];
  };
  color?: string;
  onSelectedOptions: (options: string[]) => void;
  onClearOptions: () => void;
  onClear?: boolean;
};

export default FilterDropdownComponentData