import { FC, useEffect, useState } from "react"
import VideoComponentData from "@/types/Video.types"
import Youtube from "@/old-components/Youtube"


const Video: FC<VideoComponentData> = ({ dimensions, data }: VideoComponentData) => {

  const [ confNewHeight, setConfNewHeight ] = useState<any>([])

  const [ changeDetect, setChangeDetect ] = useState<number>(0);

  const [ confVideo, setConfVideo ] = useState<any>({})
  
  const detectResize = () => {
    setChangeDetect((prevState: number) => prevState + 1);
  }

  useEffect(() => {
    setConfNewHeight([...dimensions])
  },[dimensions])

  useEffect(() => {
    detectResize();
    window.addEventListener('resize', detectResize);
    return () => window.removeEventListener('resize', detectResize);
  }, []);

  useEffect(() => {
    if(confNewHeight.length >= 3){
      const { outerWidth } = window;
      let newH = confNewHeight[0];
      if (outerWidth < 1024 && outerWidth >= 600) {
        newH = confNewHeight[1];
      }
      if ( outerWidth < 600) {
        newH = confNewHeight[2];
      }
      const newConf = {...data, dimensions: {...data.dimensions, height: newH}}
      setConfVideo({...newConf})
      return
    }
    setConfVideo({...data});
  }, [changeDetect]);// eslint-disable-line react-hooks/exhaustive-deps

  return <Youtube data={ confVideo }/>

}
  
export default Video

