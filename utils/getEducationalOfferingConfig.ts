import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { ProgramLevel } from "@/utils/getProgramBySlug";

type LevelConfig = {
  slug: string;
  level: {
    data: {
      attributes: {
        title: ProgramLevel;
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
  const response = await fetchStrapiGraphQL<EducationalOfferingConfigResponse>(EDUCATIONAL_OFFERING_CONFIG);
  return response?.educationalOffering?.data?.attributes?.levelsConfig;
};

const EDUCATIONAL_OFFERING_CONFIG = `
query EducationalOfferingConfig {
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
