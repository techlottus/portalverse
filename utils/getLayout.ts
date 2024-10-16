import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { FooterData } from "./getFooters";

type Layout = {
  layouts: {
    data: Array< {
      attributes: {
        name: string
        footer : FooterData
      }
    }>
  }
}

export const getLayout = async (id = 1) => {
  const response = await fetchStrapiGraphQL<Layout>(
    LAYOUTS,
    { id }
  );
  
  return response?.layouts?.data[0];
};

export const LAYOUTS = `
query Layouts($id: ID) {
  layouts(
    filters: { id: { eq :$id} }
    pagination: { start: 0, limit: -1 }
  ) {
    data {
      attributes {
        name
        footer {
          data {
            attributes {
              name
              footerSection {
                title
                logo
                phone {
                  phone
                  icon_name
                }
                images {
                  data {
                    attributes {
                      name
                      url
                      alternativeText
                    }
                  }
                }
                links {
                  text
                  href
                  target
                  iconName
                  iconPosition
                  disabled
                }
                position
                social_medias {
                  data {
                    attributes {
                      name
                      icon_name
                      href
                    }
                  }
                }
                columns {
                  groups {
                    title
                    href
                    target
                    items {
                      label
                      href
                      bold
                      target
                    }
                  }
                }
              }
            }
          }
        }
        header {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
`;

export default getLayout;
