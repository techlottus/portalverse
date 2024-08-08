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
  const { tabs  } = props;

  const tabsLabelsArray : Array < { label : string } > = [];
  tabs.map( (tab)=> tabsLabelsArray.push( { "label":tab?.title } ) )

  // State that controls which tab is active and the renderOption
  const [tabActive, setTabActive] = useState<number>(0);

  /* ----------COMPONENT FUNCTIONS-----------------------------------------------------------------------------*/
  
  const TextVideoList = (dataList?:Array<RichTextVideoSection>)=>{
    return (<Container>{dataList?.map((videoData,i)=><RichTextVideo {...videoData} key={i} />)}</Container>)
  }

  const TextImageList = (dataList?:Array<RichTextImageSection>)=>{
    return (<Container>{dataList?.map((imageData,i)=><RichTextImage {...imageData} key={i} />)}</Container>)
  }

  const BannerCards = (data?:any) =>{
    return <BannerCardsSection {...data}/>
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
      TextVideoList(tabs[tabActive]?.richtextVideo): BannerCards(tabs[tabActive]?.bannerIconCard)
    return option;
  }

  return (
    <section>
      <Container>
        <div className="flex w-full justify-center ">
          <div className="w-fit">
           <TabsFeatured tabs={tabsLabelsArray} onActive={(active: number) => setTabActive(active)}/> 
          </div>
        </div>
      </Container>
          {renderOption()}
    </section>
  );
}

export default Tabs