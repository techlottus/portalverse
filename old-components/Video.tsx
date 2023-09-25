import { FC, useEffect, useState } from "react"
import VideoComponentData from "@/types/Video.types"
import Youtube from "@/old-components/Youtube"


const Video: FC<VideoComponentData> = ({ data }: VideoComponentData) => {

  const [ confVideo, setConfVideo ] = useState<any>({})
  
   useEffect(() => {
     setConfVideo({...data});
   }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return <Youtube data={ confVideo }/>

}
  
export default Video

