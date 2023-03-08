import { FC, memo, useEffect, useState } from "react"
import cn from "classnames"
import FilterDropdownComponentData, { FilterDropdownConfig } from "@/types/FilterDropdown"
import Checkbox from "@/old-components/Checkbox"
import Button from "@/old-components/Button/Button"
import { ButtonInit } from "@/old-components/fixture"
import { CheckboxConfig } from "@/types/Checkbox.types"

const FilterDropdown: FC<FilterDropdownComponentData> = memo(({ data: { config, options }, onSelectedOptions, color, onClear }: FilterDropdownComponentData) => {

  const [ open, setOpen ] = useState(false);
  const [ active, setActive ] = useState(false);
  const [ optionsList, setOptionsList ] = useState<any[]>([])
  const [ buttonConfig, setButtonConfig ] = useState({ ...ButtonInit, title: 'Aplicar', type: 'outlined', disabled: true });

  const [ allOptions, setAllOptions ] = useState<any>([]);
  const [ optionsCollection, setOptionsCollection ] = useState<CheckboxConfig[]>([]);
  const [ configComponent, setConfigComponent ] = useState<FilterDropdownConfig>({ label: "" });

  const onOpenClose = () => setOpen(!open)

  const getOptionSelected = (evt: CustomEvent, position: number) => {
    const { data: { selected } } = (evt.target as any);
    const option = optionsCollection[position].label;
    setOptionsList((state: string[]) => selected ? [...state, option] : state.filter((item: string) => item !== option))
    setOptionsCollection(() => optionsCollection.map((item: any, i: number) => ({ label: item.label, disabled: item.active, selected: position === i ? selected : item.selected })));
  }
  
  const applySelection = () => {
    setOptionsList((state: string[]) => {
      if (active) {
        onSelectedOptions(state);
        if (open) {
          onOpenClose();
        }
      }
      return state; 
    });
    setActive(true);
  }
  
  useEffect(() => {
    setConfigComponent(() => ({ ...config }));
  }, [config]);// eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    setAllOptions([ ...options ]);
    setOptionsCollection(() => options.map((item: any) => ({ label: item.label, disabled: item.active, selected: false  })));
  }, [options]);// eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    setButtonConfig({ ...buttonConfig, disabled: !optionsList.length })
    if( !optionsList.length ) {
      applySelection();
    }
  }, [optionsList]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (onClear) {
      setOptionsCollection(() => allOptions.map((item: any) => ({ label: item.label, disabled: item.active, selected: false  })));
      setOptionsList([]);
    }
  }, [onClear]);// eslint-disable-line react-hooks/exhaustive-deps

  return <section className="relative">
    <section className="dropdown" onClick={onOpenClose}>
      <span className={cn(`material-icons icon text-[${color}]`)}>{ configComponent.icon }</span>
      <p className={cn(`font-Nunito-Sans font-normal text-black`)}>{ configComponent.label }</p>
      <span className="material-icons icon" onClick={onOpenClose}>expand_{ open ? 'less' : 'more' }</span>
    </section>
    <section className="dropdown-list absolute w-full top-[44px] bg-white z-10" style={{ display: open ? 'flex' : 'none' }}>
      {
        optionsCollection.map((option: CheckboxConfig, i: number) => <div key={`optionDropdown-${i}`}>
            <Checkbox data={option} onCheck={(evt: CustomEvent) => getOptionSelected(evt, i)} />
          </div>)
      }
      <div>
        <Button data={buttonConfig} onClick={applySelection}/>
      </div>
    </section>
  </section>
});

export default FilterDropdown