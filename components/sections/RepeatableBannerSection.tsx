import { FC } from "react";
import Container from "@/layouts/Container.layout";
import parseEditorRawData from "@/utils/parseEditorRawData";
import BannerPortalverseWrapper from "@/components/BannerPortalverseWrapper";
import RichtText from "@/old-components/Richtext/Richtext";
import type { RepeatableBanner } from "@/utils/strapi/sections/RepeatableBanner";
import router from "next/router";

const RepeatableBannerSection: FC<RepeatableBanner> = (props: RepeatableBanner) => {
  const { title, description, banners } = props
  const formattedDescription = parseEditorRawData(description)
  return (
    <section>
      <Container>
        <div>
          {
            title ?
              <div className="mb-6"><p className="font-headings text-10 leading-12 mobile:text-6 mobile:leading-7 ">{title}</p></div>
              : null
          }
          {
            description ?
              <div className="mb-6">
                <RichtText data={{
                  content: formattedDescription
                }} />
              </div>
              : null
          }
          {
            banners?.length > 0 ?
              <div className="grid desktop:grid-cols-2 gap-6 tablet:grid-cols-1 mobile:grid-cols-1">
                {
                  banners?.map((item: any, i: number) => <div key={`section-banners-${i}`}>
                    <BannerPortalverseWrapper data={item} onClick={() => {
                      router.push(item?.ctaUrl);
                    }}/>
                  </div>)
                }
              </div>
              : null
          }
        </div>
      </Container>
    </section>
  )
}

export default RepeatableBannerSection