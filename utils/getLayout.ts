import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { Footer } from "./getFooters";
import { MenuType } from "./strapi/sections/Header";

export type Layout = {
  layouts: {
    data: Array<{
      attributes: {
        name: string
        footer: Footer
        header: MenuType
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
              links(pagination: {start: 0, limit: -1}){
                  id
                  text
                  target
                  href
                  iconName
                  iconPosition         
                }  
              button{
                label
                CTA
                size
                id
                variant
                iconName
              }
              
              menu_items(pagination: {start: 0, limit: -1}) {
                id
                label
                linkText
                href
                items(pagination: {start: 0, limit: -1}){
                  id
                  label
                  bold
                  href
                  linkText
                  items(pagination: {start: 0, limit: -1}){
                    id
                    label
                    bold
                    href
                    items(pagination: {start: 0, limit: -1}){
                      id
                      label
                      href
                      bold              
                    }
                  }
                } 
              }  
              banners(pagination: {start: 0, limit: -1}){
                  title
                  subtitle
                  desktopRatio
                  desktopImage{
                    data{
                      attributes{
                        url
                        alternativeText
                      }
                    }
                  }
                  ctaUrl
                  ctaText
                  textPosition
                  overlay
                  contentVariant 
                }
          
              alert{
                title
                subtitle
                image{
                  data{
                    attributes{
                      url
                    }
                  }
                }
                link{
                  text
                  target
                  iconName
                  iconPosition
                  href
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

export default getLayout;
