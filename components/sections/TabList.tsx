import { FC, memo, useState } from "react";
import Container from "@/layouts/Container.layout";
import { TabList } from "@/utils/strapi/sections/TabList";
import TabsFeatured from "@/old-components/TabsFeatured";
import RichTextImage from "./RichTextImage";
import { RichTextVideoSection } from "@/utils/strapi/sections/RichTextVideo";
import RichTextVideo from "./RichTextVideo";
import { RichTextImageSection } from "@/utils/strapi/sections/RichTextImage";

const Tabs: FC<TabList> = memo((props: TabList) => {
  const { tabs  } = props;

  const tabsLabelsArray : Array < { label : string } > = [];
  tabs.map( (tab)=> tabsLabelsArray.push( { "label":tab?.title } ) )

  // State that controls which tab is active and the renderOption
  const [tabActive, setTabActive] = useState<number>(0);

  /* ----------COMPONENT FUNCTIONS-----------------------------------------------------------------------------*/
  
  const TextVideoList = (dataList?:Array<RichTextVideoSection>)=>{
    return (<>{dataList?.map((videoData)=><RichTextVideo {...videoData} />)}</>)
  }

  const TextImageList = (dataList?:Array<RichTextImageSection>)=>{
    return (<>{dataList?.map((imageData)=><RichTextImage {...imageData} />)}</>)
  }
  // Add here new component, then add it in renderOption function
  /*
  /*
  /*

  /*-----------FUNCTION RENDER ACCORDING TO STATUS tabActive --------------------------------------------------*/
  const renderOption =()=>{
    //TODO: Add switch to manage more options
    const option = tabs[tabActive]?.content == "richtextImage" ?
                   TextImageList(tabs[tabActive]?.richtextImage) :
                   TextVideoList(tabs[tabActive]?.richtextVideo)
    return option;
  }

  return (
    <section>
      <Container>
        <TabsFeatured tabs={tabsLabelsArray} onActive={(active: number) => setTabActive(active)}/> 
          {renderOption()}
      </Container>
    </section>
  );
})

export default Tabs