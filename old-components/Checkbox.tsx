import { useEffect, createRef, FC, memo } from "react"
import CheckboxComponentData from "@/types/Checkbox.types"

const Checkbox: FC<CheckboxComponentData> = memo(({ data, onCheck }: CheckboxComponentData) => {
  const checkboxRef = createRef();

  useEffect(() => {
    (checkboxRef.current as any).data = {
      label: data.label || "",
      disabled: !!data.disabled,
      selected: !!data.selected,
      name: data.name || "",
    };
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let observerRef: any = null;
    if (!!checkboxRef.current) {
      observerRef = checkboxRef.current,
    (checkboxRef.current as any).removeEventListener("onCheck", onCheck, false);
    }
    (checkboxRef.current as any).addEventListener("onCheck", onCheck, false);
    return () => {
      if (!!observerRef) {
        (observerRef as any).removeEventListener("onCheck", onCheck, false);
      }
    }
  }, [onCheck]);// eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-checkbox ref={checkboxRef}></lottus-checkbox>
});

export default Checkbox