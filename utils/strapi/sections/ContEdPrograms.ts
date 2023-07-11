import { getDataPageFromJSON } from "@/utils/getDataPage";
import getEducationalOfferingConfig from "@/utils/getEducationalOfferingConfig";
import { normalizePath } from "@/utils/misc";
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
  programParentPageSlug?: string;
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

export type StaticContinuousEducationProgram = {
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

export type StaticContinuousEducationCategory = {
  title: string;
  cursos: Array<StaticContinuousEducationProgram>
}

const formatStaticProgramCategory = (category: StaticContinuousEducationCategory): ContinuousEducationCategory => {
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

const excludeHiddenPrograms = (category: StaticContinuousEducationCategory) => {
  return {
    ...category,
    cursos: category?.cursos?.filter(
      (program) => !program?.hidden
    ),
  };
}

const hasAtLeastOneProgram = (category: StaticContinuousEducationCategory) => {
  return category?.cursos?.length > 0;
}

export const formatContEdProgramsSection = async(section: ContEdProgramsSection) => {
  const continuousEducationStaticPageData = await getDataPageFromJSON('extension-universitaria/extension-universitaria.json');
  const staticCategories = continuousEducationStaticPageData?.sections?.extension?.sections as Array<StaticContinuousEducationCategory>;
  const formattedStaticCategories = staticCategories
    ?.map(excludeHiddenPrograms)
    ?.filter(hasAtLeastOneProgram)
    ?.map(formatStaticProgramCategory)

  const categories = section?.categories?.data;

  categories?.forEach(category => {
    const categoryName = category?.attributes?.name;
    const programs = category?.attributes?.programs?.data;

    // Retrieve static programs under the given category.
    const staticPrograms =
      formattedStaticCategories?.find(
        (programCategory) => programCategory?.attributes?.name === categoryName
      )?.attributes?.programs?.data || [];

    category.attributes.programs.data = [
      ...programs,
      ...staticPrograms,
    ];

  })

  const educationalOfferingConfig = await getEducationalOfferingConfig();
  const continuousEducationSlug = educationalOfferingConfig?.find(
    (configItem) =>
      configItem?.level?.data?.attributes?.title === "Educación Continua"
  )?.slug || "";

  section.programParentPageSlug = normalizePath(continuousEducationSlug);

  return section;
}