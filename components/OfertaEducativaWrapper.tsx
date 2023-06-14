import OfertaEducativa from "@/old-components/OfertaEducativa";
import { formatStrapiImage } from "@/utils/strapi";
import {
  OverlayCard,
  OverlayCardListSection,
} from "@/utils/strapi/sections/OverlayCardList";
import { Replace } from "@/utils/typescript";

const defaultLevelData = {
  level: "",
  title: "",
  url: "/",
  promo: {
    urlImage: {
      mobile: "",
      desktop: "",
    },
    text: "",
    icon: "arrow_forward",
    color: "",
    opacity: "multiply",
    height: "282px",
    enable: true,
    nobackground: false,
  },
};

type LevelObj = typeof defaultLevelData;

const defaultComponentData = {
  data: [defaultLevelData],
  classNames: "",
};

type OfertaEducativaComponentData = typeof defaultComponentData;

const formatOverlayCardsData = (cards: Array<OverlayCard>): Array<LevelObj> => {
  const formattedCards: Array<LevelObj> = cards?.map((card) => {
    // Create new object with default data
    const formattedCard: LevelObj = JSON.parse(
      JSON.stringify(defaultLevelData)
    );

    // Replace fields with Strapi data
    formattedCard.url = card?.url;
    formattedCard.title = card?.title;
    formattedCard.promo.urlImage.desktop = formatStrapiImage(card?.image)
    formattedCard.promo.urlImage.mobile = formatStrapiImage(card?.image);
    formattedCard.promo.text = card?.title;
    formattedCard.promo.color = card?.overlayColor;

    return formattedCard;
  });

  return formattedCards;
};

const formatData = (props: OfertaEducativaWrapperProps): Array<LevelObj> => {
  const { data: strapiData } = props;

  const strapiOverlayCards = strapiData?.overlayCards;

  const formattedOverlayCards = formatOverlayCardsData(strapiOverlayCards);

  return formattedOverlayCards;
};

type OfertaEducativaWrapperProps = Replace<
  OfertaEducativaComponentData,
  "data",
  OverlayCardListSection
>;

const OfertaEducativaWrapper = (props: OfertaEducativaWrapperProps) => {
  const formattedData = formatData(props);
  return <OfertaEducativa {...props} data={formattedData} />;
};

export default OfertaEducativaWrapper;
