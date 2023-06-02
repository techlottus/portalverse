import { fetchStrapiGraphQL } from "@/utils/getStrapi";

export type PodcastEpisodesVariables = {
  page?: number;
  pageSize?: number;
  sort?: "publicationDate:desc" | "publicationDate:asc";
};

const getPodcastEpisodes = async (variables: PodcastEpisodesVariables) => {
  const { page = 1, pageSize, sort = "publicationDate:desc" } = variables;

  const data = await fetchStrapiGraphQL<PodcastEpisodesResponse>(
    PODCAST_EPISODES,
    {
      page,
      pageSize,
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
  podcasts(filters: { type: { eq: "episode" } }, sort: $sort) {
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
