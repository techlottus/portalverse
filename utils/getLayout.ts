import { fetchStrapiGraphQL } from "@/utils/getStrapi";

type Layout = {
  layouts: {
    data: Array< {
      name: string
    }>
  }
}

const getLayout = async (id = 1) => {
  const response = await fetchStrapiGraphQL<Layout>(
    LAYOUTS,
    { id }
  );
  
  return response?.layouts?.data[0];
};

const LAYOUTS = `
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
                images {
                  data {
                    attributes {
                      name
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
                      icon {
                        data {
                          attributes {
                            name
                          }
                        }
                      }
                      href
                    }
                  }
                }
                columns {
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
