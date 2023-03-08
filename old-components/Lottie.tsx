import { createRef, FC, memo, useEffect } from "react"
import LottieComponentData from "@/types/Lottie.types"

const Lottie: FC<LottieComponentData> = memo(({ data }: LottieComponentData) => {
  const lottieRef = createRef();

  useEffect(() => {
    const { data: options } = data;
    (lottieRef.current as any).data = { ...options };
    if(data.hasOwnProperty('dimensions')) {
      const { dimensions } = data;
      // set dimensions
      if(dimensions.hasOwnProperty('height')) {
        (lottieRef.current as HTMLElement).style.height = dimensions.height!;
      }
      if(dimensions.hasOwnProperty('width')) {
        (lottieRef.current as HTMLElement).style.width = dimensions.width!;
      }
    }
  }, [data, lottieRef]);// eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-lottie ref={lottieRef}></lottus-lottie>
});

export default Lottie