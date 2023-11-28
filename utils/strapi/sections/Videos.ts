export type VideoItem= {
  provider: string;
  providerId: string;
}

export type VideosSectionData = {
  type: "ComponentSectionsVideos";
  title: string;
  description:string;
  videos: Array<VideoItem>;
}

export const VIDEOS_SECTION = `
...on ComponentSectionsVideos{
  title
  description
  videos{
    provider
    providerId
  }
}
`;