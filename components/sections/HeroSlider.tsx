import Container from "@/layouts/Container.layout";
import SliderPortalverseWrapper from "@/components/SliderPortalverseWrapper";
import type { HeroSliderSection } from "@/utils/strapi/sections/HeroSlider";

const HeroSlider = (props: HeroSliderSection) => {
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
