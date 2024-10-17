import { fetchStrapiGraphQL } from "@/utils/getStrapi";

import { MenuType } from "./strapi/sections/Header";
import { FooterData } from "./getFooters";

export type Layout = {
  layouts: {
    data: Array<LayoutAttributes>
  }
}
export type LayoutAttributes = {
  data: {
    attributes: {
      name: string
      footer: FooterData
      header: MenuType
    }
    
    data: Array< {
      attributes: {
        name: string
        footer : FooterData
      }
    }>
  }
}


export const getLayout = async (name = "Default") => {
  const response = await fetchStrapiGraphQL<Layout>(
    LAYOUTS,
    { name }
  );

  return response?.layouts?.data[0];
};

export const LAYOUTS = `
query Layouts($name: String) {
  layouts(
    filters: { name: { eq :$name} }
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
              social_medias(pagination: {start: 0, limit: -1}){
                data{
                  attributes{
                    name
                    icon_name
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
}
`;

export default getLayout;
