import Container from "@/layouts/Container.layout";
import SliderPortalverseWrapper from "@/components/SliderPortalverseWrapper";
import type { HeroSliderSection } from "@/utils/strapi/sections/HeroSlider";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";

const HeroSlider = (props: HeroSliderSection) => {
  const formattedDescription = parseEditorRawData(props?.description);
  return (
    <section>
      <Container classNames="w-p:!p-0 w-t:!p-0">
        {
          props?.title ?
            <p className="font-headings font-bold text-10 w-t:text-6 w-p:text-6 leading-tight mb-6">{props?.title}</p>
            : null
        }
        {
          props.description ?
            <RichtText data={{ content: formattedDescription }} />
            : null
        }
        <div className="w-d:hidden">
          <SliderPortalverseWrapper data={{ ...props }} mobile />
        </div>
        <div className="w-p:hidden w-t:hidden">
          <SliderPortalverseWrapper data={{ ...props }} />
        </div>
      </Container>
    </section>
  );
};

export default HeroSlider;
