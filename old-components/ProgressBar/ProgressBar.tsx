import { createRef, FC, useEffect, useState } from "react"
import ProgressBarComponentData, { ProgressBarConfig } from "@/types/Progress.types"
import { ProgressBarInit } from "@/old-components/fixture";

const ProgressBar: FC<ProgressBarComponentData> = ({ data }: ProgressBarComponentData) => {

  const progressBarRef = createRef();

  const [ config, setConfig ] = useState<ProgressBarConfig>({ ...ProgressBarInit });

  useEffect(() => {
    const newConfig = { ...config, ...data };
    setConfig({ ...newConfig });
    (progressBarRef.current as any).data = {
      title: newConfig.title || '',
      progress: newConfig.progress || 0,
      description: newConfig.description || '',
      size: newConfig.size || 'small',
      disabled: newConfig.disabled || false,
    }
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-progress-bar ref={progressBarRef}></lottus-progress-bar>
}

export default ProgressBar