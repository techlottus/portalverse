export type MosaicConfig = {
  /**
  * Array image
  */
  images: Array<MosaicPortalverseContentInterface>;
}

export type MosaicPortalverseContentInterface = {
  /**
  * Id image
  */
  id: string;
  /**
   * Image url
   */
  image?: string;
  /**
   * Name of icon
   */
  icon?: string;
}

export type MosaicData = {
  data: MosaicConfig;
  onClick?: () => void;
}