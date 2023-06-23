import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { StrapiImage } from "@/types/strapi/common";

type CurriculumsDetail = {
  campus: {
    data: {
      attributes: {
        name: string;
      }
    }
  },
  curriculum: {
    data: {
      attributes: {
        url: string;
      }
    }
  }
}

type ProgramModalitiesDetail = {
  modality: {
    data: {
      attributes: {
        name: string;
      }
    }
  }
  admissionProfile: string;
  graduateProfile: string;
  laborField: string;
  admissionRequirements: string;
  curriculumDescription: string;
  curriculums: Array<CurriculumsDetail>
}

export type ProgramData = {
  attributes: {
    name: string;
    description: string;
    image: StrapiImage;
    programModalities: Array<ProgramModalitiesDetail>
    level: {
      data: {
        attributes: {
          title: string;
        }
      }
    }
  }
}

type ProgramDetail = {
  data: Array<ProgramData>
};

type ProgramsDetailResponse = {
  programs: ProgramDetail;
};

const getProgramsData = async () => {
  const pageData = await fetchStrapiGraphQL<ProgramsDetailResponse>(PROGRAMS_DATA);
  return pageData;
};

const PROGRAMS_DATA = `
query GetAllProgramsData {
  programs(pagination: { start: 0, limit: -1 }) {
    data {
      attributes {
        name
        description
        image {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
        level {
          data {
            attributes {
              title	
            }
          }
        }
        programModalities {
          admissionProfile
          graduateProfile
          laborField
          admissionRequirements
          curriculumDescription
          curriculums {
            campus {
              data {
                attributes {
                  name
                }
              }
            }
            curriculum {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default getProgramsData;