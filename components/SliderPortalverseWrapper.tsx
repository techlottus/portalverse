import SliderPortalverse from "@/old-components/SliderPortalverse";
import { formatStrapiImage } from "@/utils/strapi";
import { HeroSliderSection, Slide } from "@/utils/strapi/sections/HeroSlider";
import { Replace } from "@/utils/typescript";

const defaultSliderData = {
  width: "100%",
  height: "600px",
  iconleft: "arrow_back_ios",
  iconright: "arrow_forward_ios",
  slides: [
    {
      contentVariant: "dark",
      title: "",
      text: "",
      textPosition: "",
      urlImage: {
        mobile:"",
        tablet:"",
        desktop:"",
      },
      center: true,
      left: false,
      middle: true,
      bottom: false,
      overlayWhite: false,
      overlayDak: false,
      action: {
        id: "",
        type: "",
        title: "",
        size: "",
        icon: "",
        lyIcon: false,
        disabled: false,
        isExpand: false,
        tagOnClick: "",
        test: "",
        redirect: "",
      },
    },
  ],
};

type SliderConfig = typeof defaultSliderData;
type SlideConfig = typeof defaultSliderData.slides[0];


type SliderPortalverseComponentData = {
  data: SliderConfig;
  onBtn?: () => {};
  classNames?: string;
  mobile?: boolean;
};

const formatSlides = (slides: Array<Slide>): Array<SlideConfig> => {
  const formattedSlides = slides?.map((slide) => {
    // Create new object with default data
    const formattedSlideData: SlideConfig = JSON.parse(JSON.stringify(defaultSliderData.slides[0]));
    formattedSlideData.contentVariant = slide?.contentVariant
    formattedSlideData.title = slide?.title
    formattedSlideData.text = slide?.subtitle
    // @ts-ignore
    formattedSlideData.textPosition = slide?.textPosition
    formattedSlideData.urlImage = {
      mobile : formatStrapiImage(slide?.mobileImage),
      desktop : formatStrapiImage(slide?.desktopImage),
      tablet: formatStrapiImage(slide?.tabletImage)
    };
    formattedSlideData.overlayWhite = slide?.overlay === "white",
    formattedSlideData.overlayDak = slide?.overlay === "black",
    formattedSlideData.action.title = slide?.ctaText
    formattedSlideData.action.redirect = slide?.ctaUrl
    
    return formattedSlideData
  })
  return formattedSlides
}
const formatData = (
  props: SliderPortalverseWrapperProps
): SliderConfig => {
  const { data } = props;

  // Create new object with default data
  const formattedData: SliderConfig = JSON.parse(JSON.stringify(defaultSliderData));

  // Replace fields with Strapi data
  formattedData.slides = formatSlides(data?.slides)
  return formattedData
};

type SliderPortalverseWrapperProps = Replace<
  SliderPortalverseComponentData,
  "data",
  HeroSliderSection & { height?: string }
>;

const SliderPortalverseWrapper = (props: SliderPortalverseWrapperProps) => {
  const formattedData = formatData(props);
  return <SliderPortalverse {...props} data={formattedData} />;
};

export default SliderPortalverseWrapper;
