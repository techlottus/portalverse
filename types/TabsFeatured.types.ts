export type ItemTabsComponent ={
  label: string;
}

type TabsComponentConfig = {
  tabs: Array<ItemTabsComponent>;
  active?: number;
  onActive: (status: number) => void;
}

export default TabsComponentConfig