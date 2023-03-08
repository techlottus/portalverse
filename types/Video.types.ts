import { YoutubeDimensions, YoutubeOptions } from "@/types/Youtube.types"

export type VideoComponentConf = {
  options: YoutubeOptions;
  dimensions?: YoutubeDimensions;
}

type VideoComponentData = {
  dimensions: Array<string>;
  data: VideoComponentConf;
}

export default VideoComponentData
