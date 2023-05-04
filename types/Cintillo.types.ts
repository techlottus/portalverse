import Image from "@/types/Image.type";

export type CintilloData = {
  image?: Image;
  title?:string;
  subtitle?:string;
  email: string;
  phone: string;
  classNames?: string;
  whatsApp?: string;
  actionLink?: any;
  contentVariant?: "light" | "dark";
  desktopRatio?: string;
  tabletRatio?: string;
  mobileRatio?: string;
}

export default CintilloData