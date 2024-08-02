import React, { useState } from "react";
import type { FC } from "react";
import Container from "@/layouts/Container.layout"
import RichtText from "@/old-components/Richtext/Richtext";
import RockstarInfo from "@/components/sections/RockstarInfo";
import parseEditorRawData from "@/utils/parseEditorRawData";
import PaginatorPortalverse from "@/old-components/PaginatorPortalverse";
import type { RockstarInfoListSection } from "@/utils/strapi/sections/RockstarInfloList";

const RockstarInfoList: FC<RockstarInfoListSection> = (props: RockstarInfoListSection) => {
  const { title, description, rockstars } = props;
  const pageSize = 16;

  const rockstarsData = rockstars?.sort((a, b) => // sort rockstars alphabetically
    a?.name < b?.name ? -1 : a?.name > b?.name ? 1 : 0
  );

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  if (rockstarsData?.length <= 0) {
    return null;
  }

  const paginate = <T,>(items: Array<T>, pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items?.slice(startIndex, startIndex + pageSize);
  };

  const paginatedItems = paginate(
    rockstarsData,
    currentPage,
    pageSize
  );

  return (
    <section className="bg-surface-200 pb-14">
      <Container>
        {
          title ? <div className="py-14 mobile:py-6"><h3 className="font-headings font-bold text-10 leading-12 mobile:text-6 mobile:leading-7">{title}</h3></div> : null
        }
        {
          description ?
            <div className="pb-14 mobile:pb-6">
              <RichtText data={{
                content: parseEditorRawData(description)
              }} />
            </div>
            : null
        }
        {
          rockstars?.length > 0 ?
            <div className="flex flex-col gap-4 desktop:hidden tablet:hidden">
              <section className="grid mobile:grid-cols-2 mobile:gap-7">
                {
                  rockstarsData?.map((item: any, i: number) => <div key={`section-blog-${i}`}>
                    <RockstarInfo {...item} type={"ComponentSectionsRockstarInfo"} />
                  </div>)
                }
              </section>
            </div>
            : null
        }
        {
          rockstars?.length > 0 ?
            <div className="flex flex-col gap-4 mobile:hidden">
              <section className="col-span-12 grid desktop:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-2 mobile:gap-7 tablet:gap-10 desktop:gap-10">
                {
                  paginatedItems?.map((item: any, i: number) => <div key={`section-blog-${i}`}>
                    <RockstarInfo {...item} type={"ComponentSectionsRockstarInfo"} />
                  </div>)
                }
              </section>
              <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 my-6 flex justify-center mobile:hidden">
                <PaginatorPortalverse items={rockstars?.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} iconNext={"chevron_right"} iconPrevious={"chevron_left"} />
              </div>
            </div>
            : null
        }
      </Container>
    </section>
  );
};

export default RockstarInfoList;