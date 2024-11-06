import type {
  StrapiButton,
  StrapiImage,
} from "@/types/strapi/common";
import { Link } from "./LinkList";
import { BannerPortalverseConfig } from "@/types/BannerPortalverse.types";
import ButtonComponentData from "@/types/Button.types";

export type SubitemType = {
  id?: string;
  label?: string;
  bold?: boolean;
  href?: string;
  linkText?:string;
}
export  type ItemsType = SubitemType & {
  items?: SubitemType;
}
export type SubitemsType = SubitemType & {
  items?: ItemsType[];
}
export type AlertInfoType = {
  title?: string;
  subtitle?: string;
  image?: StrapiImage;
  link?: Link;
}
export type MenuItemsType = {
  id?: string;
  label?: string;
  linkText?:string;
  href?:string;
  items?: SubitemsType[];
  }
export type MenuType = {
  id?: string;
  name?: string;
  links?: Link[];
  button?: StrapiButton; 
  menu_items?: MenuItemsType[];
  banners?:  BannerPortalverseConfig;
  alert?: AlertInfoType;
  social_medias?:{
    data:{
      attributes:{
        name?:string;
        icon_name?:string;
        href?:string
      }
    }[]    
      }
};

export const HEADER = `
headers(filters:{id:{eq:"1"}}){
  data{
    id
    attributes{
      show_logo
      name
      links_button{
        ... on ComponentSectionsLink{
          id
          text
          target
          href
          iconName
          iconPosition         
        }   
       ... on ComponentMoleculesButton{
        label
        CTA
        size
        id
        variant
        iconName
      }
      } 
      menu_items(pagination: {start: 0, limit: -1}) {
        id
        label
        subitems(pagination: {start: 0, limit: -1}){
          id
          label
          bold
          href
          items(pagination: {start: 0, limit: -1}){
            id
            label
            bold
            href
            subitems(pagination: {start: 0, limit: -1}){
              id
              label
              href
              bold
              
            }
          }
        } 
      }  
      banners{
        title
        description
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
`;