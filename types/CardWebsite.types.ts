import { LinkConfig } from "@/types/Link.types"

export type CardWebsiteConfig = {
  /**
   * id card
   */
   id: string;
   /**
    * Url image
    */
   urlImage: string;
   /**
    * Text of subtitle
    */
   subtitle: string;
   /**
    * Text of title
    */
   title: string;
   /**
    * Text of phagraph
    */
   text: string;
   /**
    * border of content true | false
    */
   border: boolean;
   /**
    * show all content card true | false
    */
   allContent: boolean;
   /**
    * height of image card
    */
   height: string;
   /**
    * Show ng content
    */
   isShowCardWebsiteContent: boolean;
   /**
    * Background active
    */
   background?: boolean;
   /**
    * Type card vertical | small
    */
   type: string | 'vertical' | 'small';
   /**
    * Show link true | false
    */
   link: boolean;
 
   linkText: LinkConfig;
 
   linkIcon: LinkConfig;
 
   /**
    * Mode wrapper
    */
   wrapper?: boolean;
}

export type CardWebsiteComponentData = {
    data: CardWebsiteConfig;
    onClick?: () => void;
}

export default CardWebsiteComponentData;