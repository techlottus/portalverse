import { createRef, FC, useEffect } from "react"
import SelectComponentData from "@/types/Select.types"

const Select: FC<SelectComponentData> = ({ data, options, onClick, flagHeight }: SelectComponentData) => {
  const selectRef = createRef();

  useEffect(() => {
    (selectRef.current as any).data = {
      textDefault: data.textDefault || 'Option Default',
      disabled: data.disabled || false,
      icon: data.icon || 'person',
      reset: data.reset || false,
      zindexOptions: data.zindexOptions || 10,
      isLabel: data.isLabel || true,
      tagOnClickList: data.tagOnClickList || 'testOnClickList',
      tagOnClickOption: data.tagOnClickOption || 'testOnClickOption',
    };
    (selectRef.current as any).options = [...options];
    (selectRef.current as any).flagHeight = flagHeight;
  }, [data, options]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let observerRef: any = null;
    if (!!selectRef.current) {
      observerRef = selectRef.current;
      (selectRef.current as any).removeEventListener('onClick', onClick, false);
    }
    (selectRef.current as any).addEventListener('onClick', onClick, false);
    return () => {
      if (!!observerRef) {
        (observerRef as any).removeEventListener('onClick', onClick, false);
      }
    }
  }, [onClick]); // eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-select ref={selectRef}></lottus-select>
}

export default Select