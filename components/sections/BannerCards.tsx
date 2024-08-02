import { FC } from "react";
import Container from "@/layouts/Container.layout";
import { BannerCardsData } from "@/utils/strapi/sections/BannerCards";


const BannerCardsSection: FC<BannerCardsData> = (props: BannerCardsData) => {
  const {  desktopImage, tabletImage, mobileImage, overlay,cardIconItem } = props;
  console.log(props)
  return (
    <section>
      <Container classNames="">
        hola soy un banner con cards
      </Container>
    </section>
  );
}

export default BannerCardsSection