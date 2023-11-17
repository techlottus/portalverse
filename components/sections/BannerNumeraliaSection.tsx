import { FC } from "react";
import BannerNumeralia from "@/old-components/BannerNumeralia/BannerNumeralia";
import Container from "@/layouts/Container.layout";
import type { BannerNumeraliaData } from "@/utils/strapi/sections/BannerNumeralia";


const BannerNumeraliaSection: FC<BannerNumeraliaData> = (props: BannerNumeraliaData) => {
  const { title, subtitle, statistics, desktopImage, tabletImage, mobileImage, overlayBannerNumeralia } = props;

  const formattedStatistics = statistics?.map((item, index) => {
    const statics = {...statistics?.[index], icon: item?.iconName}
    return statics
  })

  const dataNumeralia = {
    title: title,
    subtitle: subtitle,
    overlay: overlayBannerNumeralia,
    statics: formattedStatistics,
    image: {
      desktop: desktopImage?.data?.attributes?.url,
      tablet: tabletImage?.data?.attributes?.url,
      mobile: mobileImage?.data?.attributes?.url
    }
  }

  return (
    <section>
      <Container classNames="w-p:!p-0 w-t:!p-0">
        <BannerNumeralia data={dataNumeralia}/>
      </Container>
    </section>
  );
}

export default BannerNumeraliaSection