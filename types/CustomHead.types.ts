export type CustomHeadConfig ={
  /**
   * CustomHead identifier
   */
   id?: string;
   /**
    * Text of CustomHead
    */
   text: string;
   /**
    * Types: '' | center | textWhite | textBlack
    */
   type: string;
   /**
    * Color of text only in type '' or center
    */
   color: string;
   /**
    * Background of container only in type textWhite | textBlack
    */
   bgcolor: string;
}

export type CustomHeadData = {
  data: CustomHeadConfig;
}

export default CustomHeadData