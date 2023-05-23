import Container from "@/layouts/Container.layout";
import BannerPortalverseWrapper from "@/components/BannerPortalverseWrapper";
import type { BannerSection } from "@/utils/strapi/sections/Banner";

const Banner = (props: BannerSection) => {
  return (
    <section>
      <Container>
        <BannerPortalverseWrapper data={props} />
      </Container>
    </section>
  );
};

export default Banner;
