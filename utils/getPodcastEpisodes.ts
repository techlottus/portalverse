import { fetchStrapiGraphQL } from "@/utils/getStrapi";

export type PodcastEpisodesVariables = {
  start?: number;
  limit?: number;
  sort?: "publicationDate:desc" | "publicationDate:asc";
};

const getPodcastEpisodes = async (variables: PodcastEpisodesVariables) => {
  const { start = 1, limit, sort = "publicationDate:desc" } = variables;

  const data = await fetchStrapiGraphQL<PodcastEpisodesResponse>(
    PODCAST_EPISODES,
    {
      start,
      limit,
      sort,
    }
  );

  return data;
};

export type PodcastEpisode = {
  attributes: {
    providerId: string;
    type: "playlist" | "episode" | "album" | "artist" | "track";
    publication_date: string;
  };
};

export type PodcastEpisodesResponse = {
  podcasts: {
    data: Array<PodcastEpisode>;
  };
};

const PODCAST_EPISODES = `
query PodcastEpisodes($sort: [String]) {
  podcasts(filters: { type: { eq: "episode" } }, sort: $sort, pagination: {start: 0, limit: -1}) {
    data {
      attributes {
        providerId
        type
        publicationDate
      }
    }
  }
}
`;

export default getPodcastEpisodes;
