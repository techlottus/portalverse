import Container from "@/layouts/Container.layout";
import SliderPortalverseWrapper from "@/components/SliderPortalverseWrapper";
import type { HeroSliderSection } from "@/utils/strapi/sections/HeroSlider";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";

const HeroSlider = (props: HeroSliderSection) => {
  const formattedDescription = parseEditorRawData(props?.description);
  return (
    <section>
      <Container classNames="mobile:!p-0 tablet:!p-0">
        {
          props?.title ?
            <p className="font-headings font-bold text-10 tablet:text-6 mobile:text-6 leading-tight mb-6">{props?.title}</p>
            : null
        }
        {
          props?.description ?
            <RichtText data={{ content: formattedDescription }} />
            : null
        }
        <div className="desktop:hidden">
          <SliderPortalverseWrapper data={{ ...props }} mobile />
        </div>
        <div className="mobile:hidden tablet:hidden">
          <SliderPortalverseWrapper data={{ ...props }} />
        </div>
      </Container>
    </section>
  );
};

export default HeroSlider;
