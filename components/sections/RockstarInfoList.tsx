import React from "react";
import type { FC } from "react";
import Container from "@/layouts/Container.layout"
import RichtText from "@/old-components/Richtext/Richtext";
import RockstarInfo from "@/components/sections/RockstarInfo";
import parseEditorRawData from "@/utils/parseEditorRawData";
import { RockstarInfoListSection } from "@/utils/strapi/sections/RockstarInfloList";

const RockstarInfoList: FC<RockstarInfoListSection> = (props: RockstarInfoListSection) => {
  const { title, description, rockstars } = props;

  return (
    <section className="bg-surface-200 pb-14">
      <Container>
        {
          title ? <div className="py-14 w-p:py-6"><h3 className="font-headings text-10 leading-12 w-p:text-6 w-p:leading-7">{title}</h3></div> : null
        }
        {
          description ?
            <div className="pb-14 w-p:pb-6">
              <RichtText data={{
                content: parseEditorRawData(description)
              }} />
            </div>
            : null
        }
        {
          rockstars.length > 0 ?
            <div>
              <section className="col-span-12 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-2">
                {
                  rockstars.map((item: any, i: number) => <section key={`section-blog-${i}`}>
                    <RockstarInfo name={item?.name} image={item?.image?.data?.attributes?.url} campus={item?.campus} detail={item?.detail} />
                  </section>)
                }
              </section>
            </div>
            : null
        }
      </Container>
    </section>
  );
};

export default RockstarInfoList;