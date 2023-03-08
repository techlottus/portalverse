import React, { FC, memo, useEffect, useState } from "react"
import ReactPlayer from "react-player";
import YoutubeComponentData from "@/types/Youtube.types";


const Youtube: FC<YoutubeComponentData> = memo(({ data }: YoutubeComponentData) => {
  const [ url, setURL ] = useState<string>("https://youtu.be/<id>");
  const [ newHeight, setNewHeight ] = useState("100%");

  useEffect(() => {
    if (!!data?.options?.id) {
      setURL(() => `https://youtu.be/${data?.options?.id}` )
    }
    if (!!data?.dimensions?.height) {
      setNewHeight(data?.dimensions?.height);
    }
  }, [data?.options?.id]);// eslint-disable-line react-hooks/exhaustive-deps

  return <ReactPlayer width='100%' height={newHeight} url={url} />
})

export default Youtube