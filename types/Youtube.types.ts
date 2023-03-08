export type YoutubeOptions = {
  id: string;
  type: string;
  controls: boolean;
};

export type YoutubeDimensions = {
  height: string;
  width?: string;
}

type YoutubeComponentData = {
  data: {
    options: YoutubeOptions;
    dimensions: YoutubeDimensions;
  }
}

export default YoutubeComponentData