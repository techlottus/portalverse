import { LinkIconsConfig } from "@/types/LinkLottus.types";
import ImageComponentData from "@/types/Image.types";

export interface LinkLottusFooter extends LinkIconsConfig {
  link: string;
}

export type SocialItemConfig = {
  name: string;
  link: string;
}

export type CertificationsConfig = {
  title: string;
  certificaciones: Array<ImageComponentData>
}

export type PrivacyLinkConfig = {
  link: string;
  label: string;
}

export type SectionItemConfig = {
  label: string;
  principal: boolean;
  link: string;
}

type FooterPortalverseComponentData = {
  privacyLink: PrivacyLinkConfig;
  certifications: CertificationsConfig;
  logotype: ImageComponentData;
  social: Array<SocialItemConfig>;
  phone: string;
  directorio: LinkLottusFooter;
  sections: Array<Array<Array<SectionItemConfig>>>;
  onClickLogo?: () => void;
}

export default FooterPortalverseComponentData