export type ModalConfig = {
  /**
  * Name of icon
  */
  icon: string;
  /**
   * Title of the modal
   */
  title: string;
  /**
   * Tag output click close modal
   */
  tagOnClose?: string;
  /**
   * Wrapper mode
   */
   wrapper?: boolean;
}

export type ModalData = {
  data: ModalConfig;
  isShow?: boolean;
  children: any;
  className?: string;
  onBtn?: () => void;
  onClose?: () => void; 
}

export default ModalData