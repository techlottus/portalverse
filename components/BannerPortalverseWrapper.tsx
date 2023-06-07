import BannerPortalverse from "@/old-components/BannerPortalverse";
import BannerPortalverseComponentData, { BannerPortalverseConfig } from "@/types/BannerPortalverse.types";
import { formatStrapiImage } from "@/utils/strapi";
import { BannerSection } from "@/utils/strapi/sections/Banner";
import { Replace } from "@/utils/typescript";

type BannerPortalverseTextPosition =
  | "" // maps to left_top position
  | "center"
  | "right"
  | "middle"
  | "middle-left"
  | "middle-right"
  | "middle-center"
  | "left-bottom"
  | "center-bottom"
  | "right-bottom";

const getTextPosition = (
  textPosition: BannerSection["textPosition"]
): BannerPortalverseTextPosition => {
  switch (textPosition) {
    case "center":
      return "middle-center";
    case "center_bottom":
      return "center-bottom";
    case "center_top":
      return "center";
    case "left_bottom":
      return "left-bottom";
    case "left_center":
      return "middle";
    case "left_top":
      return "";
    case "right_bottom":
      return "right-bottom";
    case "right_center":
      return "middle-right";
    case "right_top":
      return "right";
  }
};

const formatData = (props: BannerPortalverseWrapperProps): BannerPortalverseConfig => {
  const { data } = props;

  const formattedData: BannerPortalverseConfig = {
    image: {
      mobile: formatStrapiImage(data?.mobileImage),
      tablet: formatStrapiImage(data?.tabletImage),
      desktop: formatStrapiImage(data?.desktopImage)
    },
    desktopRatio: data?.desktopRatio,
    tabletRatio: data?.tabletRatio,
    mobileRatio: data?.mobileRatio,
    title: data?.title,
    subtitle: data?.subtitle,
    position: getTextPosition(data?.textPosition),
    height: data?.height || "auto",
    overlayWhite: data?.overlay === "white",
    overlayDak: data?.overlay === "black",
    button: {
      id: "",
      type: "",
      title: data?.ctaText,
      size: "",
      icon: "",
      lyIcon: false,
      disabled: false,
      isExpand: false,
      tagOnClick: "",
      test: "",
    },
    noAction: false,
    dimensions: [],
    font: data?.contentVariant === "light" ? "light" : "dark",
  }

  return formattedData;
};

type BannerPortalverseWrapperProps = Replace<
  BannerPortalverseComponentData,
  "data",
  BannerSection & { height?: string }
>;

const BannerPortalverseWrapper = (props: BannerPortalverseWrapperProps) => {
  const formattedData = formatData(props);

  return <BannerPortalverse {...props} data={formattedData} />;
};

export default BannerPortalverseWrapper;