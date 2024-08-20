import { FC, memo, useState } from "react";
import Container from "@/layouts/Container.layout";
import { TabList } from "@/utils/strapi/sections/TabList";
import TabsFeatured from "@/old-components/TabsFeatured";
import RichTextImage from "./RichTextImage";
import { RichTextVideoSection } from "@/utils/strapi/sections/RichTextVideo";
import RichTextVideo from "./RichTextVideo";
import { RichTextImageSection } from "@/utils/strapi/sections/RichTextImage";
import { BannerCardsData } from "@/utils/strapi/sections/BannerCards";
import BannerCardsSection from "./BannerCards";

const Tabs: FC<TabList> = (props: TabList) => {
  const { tabs, title, accent_title, subtitle } = props;

  const tabsLabelsArray: Array<{ label: string }> = [];
  tabs.map((tab) => tabsLabelsArray.push({ "label": tab?.title }))

  // State that controls which tab is active and the renderOption
  const [tabActive, setTabActive] = useState<number>(0);

  /* ----------COMPONENT FUNCTIONS-----------------------------------------------------------------------------*/

  const TextVideoList = (dataList?: Array<RichTextVideoSection>) => {
    return (<Container>{dataList?.map((videoData, i) => <RichTextVideo {...videoData} key={i} />)}</Container>)
  }

  const TextImageList = (dataList?: Array<RichTextImageSection>) => {
    return (<Container>{dataList?.map((imageData, i) => <RichTextImage {...imageData} key={i} />)}</Container>)
  }

  const BannerCards = (data?: any) => {
    return <BannerCardsSection {...data} />
  }
  // Add here new component, then add it in renderOption function
  /*
  /*
  /*

  /*-----------FUNCTION RENDER ACCORDING TO STATUS tabActive --------------------------------------------------*/
  const renderOption = () => {
    //TODO: Add switch to manage more options
    const option = tabs[tabActive]?.content == "richtextImage" ?
      TextImageList(tabs[tabActive]?.richtextImage) : tabs[tabActive]?.content == "richtextVideo" ?
        TextVideoList(tabs[tabActive]?.richtextVideo) : BannerCards(tabs[tabActive]?.bannerIconCard)
    return option;
  }

  return (
    <section>
      <Container>
        <div className="flex-col space-y-2 mb-4">
          <h2 className="font-headings font-bold text-surface-900 text-7 leading-9 text-center"><span className="text-secondary-500">{accent_title} </span> {title} </h2>
          <p className="font-texts font-normal text-surface-500 text-lg leading-6 text-center">{subtitle} </p>
        </div>
        <div className="flex tablet:justify-center desktop:justify-center mobile:justify-start overflow-x-auto ">
          <div className="w-fit">
            <TabsFeatured tabs={tabsLabelsArray} onActive={(active: number) => setTabActive(active)} />
          </div>
        </div>
      </Container>
      {renderOption()}
    </section>
  );
}

export default Tabs