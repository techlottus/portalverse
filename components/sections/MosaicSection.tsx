import React, { FC } from "react";
import Container from "@/layouts/Container.layout";
import { MosaicSection } from "@/utils/strapi/sections/Mosaic";
import parseEditorRawData from "@/utils/parseEditorRawData";
import Mosaic from "@/old-components/Mosaic";
import RichtText from "@/old-components/Richtext/Richtext";

const MosaicSection: FC<MosaicSection> = (props: MosaicSection) => {

  const { title, description, images } = props;

  const formattedDescription = parseEditorRawData(description);

  const arrayImages = images?.map((item, index) => {
    const img = {
      id: index.toString(),
      image: item?.image?.data?.attributes?.url
    }
    return img
  })

  return (
    <section>
      <Container>
        {
          title ?
            <h2 className="font-headings font-bold text-10 w-t:text-6 w-p:text-6 leading-tight mb-6">{title}</h2>
            : null
        }
        {
          description ?
            <RichtText data={{
              content: formattedDescription
            }} />
            : null
        }
        {
          images ?
            <Mosaic data={{
              images: arrayImages
            }} />
            : null
        }
      </Container>

    </section>
  );
};

export default MosaicSection;
