import { useRouter } from "next/router";
import Container from "@/layouts/Container.layout";
import BannerPortalverseWrapper from "@/components/BannerPortalverseWrapper";
import type { BannerSection } from "@/utils/strapi/sections/Banner";

const Banner = (props: BannerSection) => {
  const { ctaText, ctaUrl } = props;
  const router = useRouter();

  return (
    <section>
      <Container classNames={!ctaText ? "w-p:!p-0 w-t:!p-0" : ""}>
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
