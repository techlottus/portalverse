import { fetchStrapiGraphQL } from "@/utils/getStrapi";

type ProgramByLevel = {
  attributes: {
    name: string;
    slug: string;
    level: {
      data: {
        attributes: {
          title: string;
        };
      };
    };
  };
};

type ProgramsByLevelResponse = {
  programs: {
    data: Array<ProgramByLevel>;
  };
};

const getProgramsByLevel = async (level: string) => {
  const response = await fetchStrapiGraphQL<ProgramsByLevelResponse>(
    PROGRAMS_BY_LEVEL,
    { level }
  );
  return response?.programs?.data;
};

const PROGRAMS_BY_LEVEL = `
query ProgramsByLevel($level: String!) {
  programs(
    filters: { level: { title: { eq: $level } } }
    pagination: { start: 0, limit: -1 }
  ) {
    data {
      attributes {
        name
        slug
        level {
          data {
            attributes {
              title
            }
          }
        }
      }
    }
  }
}
`;

export default getProgramsByLevel;
