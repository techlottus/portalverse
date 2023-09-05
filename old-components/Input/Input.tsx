import { createRef, FC, memo, useEffect } from "react"
import InputComponentData from "@/types/Input.types"

const Input: FC<InputComponentData> = memo(({ data, value, hasError, errorMessage, eventFocus, eventKeyPress, eventBlurPress, listenIcon }: InputComponentData)  => {
  const inputRef = createRef();

  useEffect(() => {
    (inputRef.current as any).info = {
      label: data.label || '',
      name: data.name || '',
      type: data.type || '',
      typeButton: data.typeButton || '',
      maxlength: data.maxlength || '',
      onPaste: data.onPaste,
      placeholder: data.placeholder || '',
      autocomplete: data.autocomplete || '',
      disabled: data.disabled,
      alphanumeric: data.alphanumeric,
      alphabetical: data.alphabetical,
      onlyNumbers: data.onlyNumbers,
      upperCase: data.upperCase,
      pattern: data.pattern || '',
      mask: data.mask || "",
      iconLeft: data.iconLeft || "",
      test: data.test || ""
    }
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (typeof value === "undefined" || value === null) return;
    (inputRef.current as any).value = value;
  }, [value]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    (inputRef.current as any).hasError = hasError;
    (inputRef.current as any).errorMessage = errorMessage;
  }, [hasError, errorMessage]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let observerRef: any = null;
    if (!!inputRef.current) {
      observerRef = inputRef.current;
      (inputRef.current as any).removeEventListener('eventFocus', eventFocus, false);
      (inputRef.current as any).removeEventListener('eventKeyPress', eventKeyPress, false);
      (inputRef.current as any).removeEventListener('eventBlurPress', eventBlurPress, false);
      (inputRef.current as any).removeEventListener('listenIcon', listenIcon, false);  
    }
    (inputRef.current as any).addEventListener('eventFocus', eventFocus, false);
    (inputRef.current as any).addEventListener('eventKeyPress', eventKeyPress, false);
    (inputRef.current as any).addEventListener('eventBlurPress', eventBlurPress, false);
    (inputRef.current as any).addEventListener('listenIcon', listenIcon, false);
    return () => {
      if (!!observerRef) {
        (observerRef as any).removeEventListener('eventFocus', eventFocus, false);
        (observerRef as any).removeEventListener('eventKeyPress', eventKeyPress, false);
        (observerRef as any).removeEventListener('eventBlurPress', eventBlurPress, false);
        (observerRef as any).removeEventListener('listenIcon', listenIcon, false);  
      }
    }
  }, [eventFocus, eventKeyPress, eventBlurPress, listenIcon]);// eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-input ref={inputRef}></lottus-input>
});

export default Input
