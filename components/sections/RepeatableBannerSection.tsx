import { FC } from "react";
import Container from "@/layouts/Container.layout";
import parseEditorRawData from "@/utils/parseEditorRawData";
import { RepeatableBanner } from "@/utils/strapi/sections/RepeatableBanner";
import BannerPortalverseWrapper from "@/components/BannerPortalverseWrapper";
import RichtText from "@/old-components/Richtext/Richtext";

const RepeatableBannerSection: FC<RepeatableBanner> = (props: RepeatableBanner) => {
  const { title, description, banners } = props
  const formattedDescription = parseEditorRawData(description)
  return (
    <section>
      <Container>
        <section>
          {
            title ?
              <div className="mb-6"><p className="font-headings text-10 leading-12 w-p:text-6 w-p:leading-7 ">{title}</p></div>
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
            banners.length > 0 ?
              <section className="grid w-d:grid-cols-2 gap-6 w-t:grid-cols-1 w-p:grid-cols-1">
                {
                  banners.map((item: any, i: number) => <section key={`section-blog-${i}`}>
                    <BannerPortalverseWrapper data={item} />
                  </section>)
                }
              </section>
              : null
          }
        </section>
      </Container>
    </section>
  )
}

export default RepeatableBannerSection