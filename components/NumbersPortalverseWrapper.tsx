import NumbersPortalverse from "@/old-components/NumbersPortalverse/NumbersPortalverse";
import { NumbersPortalverseData } from "@/types/NumbersPortalverse.types";
import { Card } from "@/utils/strapi/sections/StatisticsCardList";
import { Replace } from "@/utils/typescript";

const defaultCardNumberData = {
  maxNumber: 0,
  icon: "",
  prefix: "",
  suffix: "",
  title: "",
  body: "",
  container: false,
  isShadowColor: true,
  bordered: true,
  typeShadowColor: "",
  boxShadow: false,
};

const formatData = (
  props: NumbersPortalverseWrapper
): NumbersPortalverseData["data"] => {
  const { data: strapiData } = props;

  // Create new object with default data
  const formattedCard: NumbersPortalverseData["data"] = JSON.parse(
    JSON.stringify(defaultCardNumberData)
  );

  // Replace fields with Strapi data
  formattedCard.maxNumber = strapiData?.maxNumber;
  formattedCard.title = strapiData?.title;
  formattedCard.body = strapiData?.body;
  formattedCard.prefix = strapiData?.prefix;
  formattedCard.suffix = strapiData?.suffix;
  formattedCard.typeShadowColor = strapiData?.boxShadowColor.replaceAll("_","-");
  formattedCard.icon = strapiData?.icon;

  return formattedCard;
};

type NumbersPortalverseWrapper = Replace<
  NumbersPortalverseData,
  "data",
  Card & { classNames?: string }
>;

const NumbersPortalverseWrapper = (props: NumbersPortalverseWrapper) => {
  const formattedData = formatData(props);
  return <NumbersPortalverse {...props} data={formattedData} />;
};

export default NumbersPortalverseWrapper;
