import { fetchStrapiGraphQL } from "@/utils/getStrapi";

type LevelConfig = {
  slug: string;
  level: {
    data: {
      attributes: {
        title: string;
      };
    };
  };
};

type EducationalOfferingConfigResponse = {
  educationalOffering: {
    data: {
      attributes: {
        levelsConfig: Array<LevelConfig>;
      };
    };
  };
};

const getEducationalOfferingConfig = async () => {
  const response = await fetchStrapiGraphQL<EducationalOfferingConfigResponse>(EDUCATIONAL_OFFERING);
  return response?.educationalOffering?.data?.attributes?.levelsConfig;
};

const EDUCATIONAL_OFFERING = `
query EducationalOffering {
  educationalOffering {
    data {
      attributes {
        levelsConfig {
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
}
`;

export default getEducationalOfferingConfig;
