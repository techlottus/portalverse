import { FC } from "react";
import ContentLayout from "@/layouts/Content.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import { BannerNumeraliaData } from "@/utils/strapi/sections/BannerNumeralia";
import BannerNumeralia from "@/old-components/BannerNumeralia/BannerNumeralia";
import Container from "@/layouts/Container.layout";

const BannerNumeraliaSection: FC<BannerNumeraliaData> = (props: BannerNumeraliaData) => {
  const { title, subtitle, statistics, desktopImage, tabletImage, mobileImage } = props;

  const formattedStatistics = statistics?.map((item, index) => {
    const statics = {...statistics?.[index], icon: item?.iconName, iconClassNames:"text-white"}
    return statics
  })

  const dataNumeralia = {
    title: title,
    subtitle: subtitle,
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