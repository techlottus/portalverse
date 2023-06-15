import { getDataPageFromJSON } from "@/utils/getDataPage";
import type { StrapiImage } from "@/types/strapi/common";

type ContinuousEducationProgram = {
  attributes: {
    name: string;
    slug: string;
    image: StrapiImage
  }
}

type ContinuousEducationCategory = {
  attributes: {
    name: string;
    programs: {
      data: Array<ContinuousEducationProgram>
    }
  }
}

export type ContEdProgramsSection = {
  type: "ComponentSectionsContEdPrograms";
  categories: {
    data: Array<ContinuousEducationCategory>
  }
};

export const CONT_ED_PROGRAMS = `
... on ComponentSectionsContEdPrograms {
  categories(pagination: { start: 0, limit: -1 }) {
    data {
      attributes {
        name
        programs(pagination: { start: 0, limit: -1 }) {
          data {
            attributes {
              name
              slug
              image {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

type StaticProgram = {
  hidden: boolean;
  id: string;
  title: string;
  link: {
    text: string;
    size: string;
    isBold: boolean;
    disabled: boolean;
    id: string;
    icon: string;
  }
  image: {
    desk: {
      alt: string;
      src: string;
    }
    mobile: {
      alt: string;
      src: string;
    }
  }
  redirect: string;
}

type StaticProgramCategory = {
  title: string;
  cursos: Array<StaticProgram>
}

const formatStaticProgramCategory = (category: StaticProgramCategory): ContinuousEducationCategory => {
  return {
    attributes: {
      name: category?.title,
      programs: {
        data: category?.cursos?.map(curso => {
          return {attributes: {
            name: curso?.title,
            slug: curso?.redirect,
            image: {
              data: {
                attributes: {
                  url: curso?.image?.desk?.src,
                  alternativeText: curso?.image?.desk?.alt
                }
              }
            }
          }}
        })
      }
    }
  }
}

export const formatContEdProgramsSection = async(section: ContEdProgramsSection) => {
  const staticProgramsData = await getDataPageFromJSON('extension-universitaria/extension-universitaria.json');
  const staticProgramCategories = staticProgramsData?.sections?.extension?.sections as Array<StaticProgramCategory>;

  const formattedStaticProgramCategories = staticProgramCategories?.map(formatStaticProgramCategory);

  const categories = section.categories.data;

  /**
   * Group programs under the same category.
   * Append categories that are not currently captured in Strapi but exist in the static JSON file. 
   */
  formattedStaticProgramCategories?.forEach(staticProgramCategory => {
    const staticCategoryName = staticProgramCategory?.attributes?.name;

    // Find if a category coming from the JSON file already exists within the categories retrieved from Strapi.
    const foundCategory = categories?.find(category => category?.attributes?.name === staticCategoryName);

    if(!!foundCategory) { // merge both programs under the same category
      const programs = foundCategory.attributes.programs?.data;
      foundCategory.attributes.programs.data = [...programs, ...staticProgramCategory?.attributes?.programs?.data];
    } else { // append the new category object
      section.categories.data = [...section.categories.data, staticProgramCategory]
    }

  });

  return section;
}