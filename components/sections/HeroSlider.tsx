import Container from "@/layouts/Container.layout";
import { HeroSliderSection } from "@/utils/strapi/sections/HeroSlider";
import SliderPortalverseWrapper from "../SliderPortalverseWrapper";

const HeroSlider = (props: HeroSliderSection) => {
  console.log("props", props);
  return (
    <section>
      <Container classNames="w-p:!p-0 w-t:!p-0">
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
