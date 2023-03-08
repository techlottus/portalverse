import { createRef, FC, memo, useEffect } from "react"
import cn from "classnames"
import RichTextComponentData from "@/types/RichText.types"

const RichtText: FC<RichTextComponentData> = memo(({ data, font = "light", classNames }: RichTextComponentData) => {
  const richTextRef = createRef();

  useEffect(() => {
    const { content } = data;
    (richTextRef.current as any).data = content;
  }, [data, richTextRef]);// eslint-disable-line react-hooks/exhaustive-deps
  
  return <div className={cn(`${font}`, classNames)}>
    <lottus-rich-text ref={richTextRef}></lottus-rich-text>
  </div>
});

export default RichtText