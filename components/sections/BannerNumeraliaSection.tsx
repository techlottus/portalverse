import { FC } from "react";
import ContentLayout from "@/layouts/Content.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import type { BannerNumeraliaSection } from "@/utils/strapi/sections/BannerNumeralia";
import BannerNumeralia from "@/old-components/BannerNumeralia/BannerNumeralia";
import Container from "@/layouts/Container.layout";

const BannerNumeraliaSection: FC<BannerNumeraliaSection> = (props: BannerNumeraliaSection) => {
  const { title, subtitle, statistics, desktopImage, tabletImage, mobileImage } = props;

  const dataBannerNumeralia = {
    title: title,
    subtitle: subtitle,
    statics: statistics,
    image: {
      desktop: desktopImage?.data?.attributes?.url,
      tablet: tabletImage?.data?.attributes?.url,
      mobile: mobileImage?.data?.attributes?.url
    }
  }

  return (
    <section>
      <Container classNames={"w-p:!p-0 w-t:!p-0"}>
        <BannerNumeralia data={dataBannerNumeralia} />
      </Container>
    </section>
  );
}

export default BannerNumeraliaSection