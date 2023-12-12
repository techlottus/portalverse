import { FC } from "react"
import Container from "@/layouts/Container.layout";
import cn from "classnames";
import parseEditorRawData from "@/utils/parseEditorRawData";
import RichtText from "@/old-components/Richtext/Richtext";
import type { ColorCardListData } from "@/utils/strapi/sections/ColorCardList";

const ColorCardList: FC<ColorCardListData> = (props: ColorCardListData) => {

  const {title, description, cards} = props;

  const formattedDescription = parseEditorRawData(description)

  return (
    <section>
      <Container>
        {
          title ? 
          <div>
            <p className="font-headings font-bold text-10 w-t:text-6 w-p:text-6 leading-tight mb-6">{title}</p>
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
          <div className="grid grid-cols-3 w-t:grid-cols-1 w-p:grid-cols-1">
            {
              cards?.map((item, i) => <section key={`colorCard-${i}`} className={cn("p-6", item?.classNames)}>
                <div>
                {
                  item?.headline ?
                    <p className="text-secondary-500 font-headings font-semibold text-10 leading-12 w-t:text-6 w-p:text-6 w-t:leading-8 w-p:leading-8">{item?.headline}</p>
                  : null
                }
                {
                  item?.title ? 
                    <p className="font-headings font-semibold text-10 leading-12 mb-4 w-t:text-6 w-p:text-6 w-t:leading-8 w-p:leading-8">{item?.title}</p>
                  : null
                }
                {
                  item?.subtitle ? 
                    <p className="font-headings font-semibold text-6 leading-8 mb-4 w-t:leading-7 w-p:leading-7">{item?.subtitle}</p>
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
      </Container>
    </section>
  );
}

export default ColorCardList