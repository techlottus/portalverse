export type NumbersPortalverseconfig = {
  maxNumber: any;
  /**
   * NumbersPortalverse icon optional
   */
  icon?: string;
  /**
   * NumbersPortalverse prefix icon optional
   */
  prefix?: string;

  /**
   * NumbersPortalverse suffix icon optional
   */
  suffix?: string;
  /**
   * NumbersPortalverse title
   */
  title?: string;
  /**
   * NumbersPortalverse body
   */
  body?: string;
  /**
   * NumbersPortalverse container to box-shadow and background true | false
   */
  container?: boolean;
  isShadowColor?: boolean;
  bordered?: boolean;
  typeShadowColor?: string;
  boxShadow?: boolean
}

export type NumbersPortalverseData = {
  data:NumbersPortalverseconfig;
  classNames?: any;
  onAnimation?: any;
  timer?: number;
}
