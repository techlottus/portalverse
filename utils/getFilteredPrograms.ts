import { fetchStrapiGraphQL } from "@/utils/getStrapi";

export type FilteredProgramsVariables = {
  level?: string;
  modality?: string;
  campus?: string;
};

export type FilteredProgramsResponse = {
  programs: {
    data: [
      {
        attributes: {
          name: string;
          slug: string;
        }
      }
    ]
  }
};

export const getFilteredPrograms = async(variables: FilteredProgramsVariables) => {
  const data = await fetchStrapiGraphQL<FilteredProgramsResponse>(
    FILTERED_PROGRAMS,
    variables
  );

  return data;
};

const FILTERED_PROGRAMS = `
query FilteredPrograms($level: String, $modality: String, $campus: String) {
  programs(
    sort: "name:asc",
    pagination: { start: 0, limit: -1 }
    filters: {
      level: { title: { eq: $level } },
      programModalities: {
        modality: { name: { eq: $modality } },
        curriculums: {campus: {name: {eq: $campus}} }
      } 
    }) {
    data {
      attributes {
        name,
        slug
      }
    }
  }
}
`;