import { YoutubeDimensions, YoutubeOptions } from "@/types/Youtube.types"

export type VideoComponentConf = {
  options: YoutubeOptions;
  dimensions?: YoutubeDimensions;
}

type VideoComponentData = {
  data: VideoComponentConf;
}

export default VideoComponentData
