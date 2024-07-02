import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { StrapiImage } from "@/types/strapi/common";

export type VacanciesPostsVariables = {
  start?: number;
  limit?: number;
  sort?: "publication_date:desc" | "publication_date:asc";
};

const getVacancies = async (variables: VacanciesPostsVariables = {}) => {

  const { start = 0, limit, sort = "publicationDate:desc" } = variables;

  const data = await fetchStrapiGraphQL<VacanciesData>(
    VACANCIES,
    {
      start,
      limit,
      sort
    }
  );
  return data;
};

export type Vacancies = {
  attributes: {
    title: string;
    abstract: string;
    slug: string;
    seo: {
      metaTitle: string;
      metaDescription: string;
      metaImage: StrapiImage;
    }
    body: string;
    publication_date: string;
    featured_image: StrapiImage;
  }
}

export type VacanciesData = {
  vacancies: {
    data: Array<Vacancies>
  }
}

export const VACANCIES = `
query vacancies ($start: Int, $limit: Int, $sort: [String]) {
  vacancies (
    pagination: { start: $start, limit: $limit }
    sort: $sort
  ) {
    data {
      attributes {
        title
        abstract
        slug
        seo {
          metaTitle
          metaDescription
          metaImage {
            data {
              attributes {
                url
              }
            }
          }
        }
        body
        publication_date
        featured_image {
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
`;

export default getVacancies;