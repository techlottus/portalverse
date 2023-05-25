import Container from "@/layouts/Container.layout";
import BannerPortalverseWrapper from "@/components/BannerPortalverseWrapper";
import type { BannerSection } from "@/utils/strapi/sections/Banner";

const Banner = (props: BannerSection) => {
  const { ctaText } = props;
  return (
    <section>
      <Container classNames={!ctaText ? "w-p:!p-0 w-t:!p-0" : ""}>
        <BannerPortalverseWrapper data={props} />
      </Container>
    </section>
  );
};

export default Banner;
