import { FC } from "react"
import Container from "@/layouts/Container.layout";
import cn from "classnames";
import parseEditorRawData from "@/utils/parseEditorRawData";
import RichtText from "@/old-components/Richtext/Richtext";
import type { ColorCardListData } from "@/utils/strapi/sections/ColorCardsList";

const ColorCardList: FC<ColorCardListData> = (props: ColorCardListData) => {

  const {title, description, cards, alternativeText} = props;

  const formattedDescription = parseEditorRawData(description)

  return (
    <section>
      <Container>
        {
          title ? 
          <div>
            <h2 className="font-headings font-bold text-10 tablet:text-6 mobile:text-6 leading-tight mb-6">{title}</h2>
          </div>
          : null
        }
        {
          description ?
          <div>
            <RichtText data={{
                content: formattedDescription
              }} />
          </div>
          : null
        }
        {
          cards?.length > 0 ? 
          <div className="grid grid-cols-3 tablet:grid-cols-1 mobile:grid-cols-1">
            {
              cards?.map((item, i) => <section key={`colorCard-${i}`} className={cn("p-6", item?.classNames)}>
                <div>
                {
                  item?.headline ?
                    <p className="text-secondary-500 font-headings font-semibold text-10 leading-12 tablet:text-6 mobile:text-6 tablet:leading-8 mobile:leading-8">{item?.headline}</p>
                  : null
                }
                {
                  item?.title ? 
                    <p className="font-headings font-semibold text-10 leading-12 mb-4 tablet:text-6 mobile:text-6 tablet:leading-8 mobile:leading-8">{item?.title}</p>
                  : null
                }
                {
                  item?.subtitle ? 
                    <p className="font-headings font-semibold text-6 leading-8 mb-4 tablet:leading-7 mobile:leading-7">{item?.subtitle}</p>
                  : null
                }
                {
                  item?.description ?
                    <RichtText data={{
                      content: parseEditorRawData(item?.description)
                    }} />
                  : null
                }
                </div>
              </section> )
            }
          </div>
          : null
        }
        {
          alternativeText ?
            <div className="flex justify-end mt-1">
              <RichtText data={{
                content:parseEditorRawData(alternativeText)
              }} />
            </div>
          : null
        }
      </Container>
    </section>
  );
}

export default ColorCardList