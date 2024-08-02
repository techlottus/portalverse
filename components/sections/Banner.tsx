import { useRouter } from "next/router";
import Container from "@/layouts/Container.layout";
import BannerPortalverseWrapper from "@/components/BannerPortalverseWrapper";
import type { BannerSection } from "@/utils/strapi/sections/Banner";

const Banner = (props: BannerSection) => {
  const { ctaText, ctaUrl } = props;
  const router = useRouter();

  return (
    <section>
      <Container classNames={!ctaText ? "mobile:!p-0 tablet:!p-0" : ""}>
        <BannerPortalverseWrapper
          data={props}
          onClick={() => {
            if (!ctaText || !ctaUrl) return;
            router?.push(ctaUrl);
          }}
        />
      </Container>
    </section>
  );
};

export default Banner;
