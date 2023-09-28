type PodcastItem = {
  format: "normal" | "compact";
  podcastItem: {
    data: {
      attributes: {
        type: "playlist" | "episode" | "album" | "artist" | "track";
        providerId: string;
      };
    };
  };
};

export type PodcastListSection = {
  type: "ComponentSectionsPodcastList";
  title: string;
  podcastItems: Array<PodcastItem>;
};

export const PODCAST_LIST = `
...on ComponentSectionsPodcastList {
  title
  podcastItems(pagination: {start: 0, limit: -1}) {
    format
    podcastItem {
      data {
        attributes {
          type
          providerId
        }
      }
    }
  }
}
`;
