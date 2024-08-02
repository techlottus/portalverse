import { FC } from "react";
import cn from "classnames";
import parseEditorRawData from "@/utils/parseEditorRawData";
import CardWebsite from "@/old-components/CardWebsite";
import Container from "@/layouts/Container.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import NumbersPortalverse from "@/old-components/NumbersPortalverse/NumbersPortalverse";
import type { CardsStatisticsData } from "@/utils/strapi/sections/CardsStatistics";

const CardsStatistics: FC<CardsStatisticsData> = (props: CardsStatisticsData) => {

  const { title, description, cardsPosition, titleCards, descriptionCards, cards, statistics, titleStatistics, descriptionStatistics } = props;
  const formattedDescription = parseEditorRawData(description);
  const formattedDescriptionCards = parseEditorRawData(descriptionCards);
  const formattedDescriptionStatistics = parseEditorRawData(descriptionStatistics);

  const formattedCards = cards?.map((item, index) => {
    const card = {
      id: index.toString(),
      urlImage: item?.image?.data?.attributes?.url,
      subtitle: item?.subtitle,
      title: item?.title,
      text: parseEditorRawData(item?.content),
      type: item?.type,
      border: true,
      allContent: true,
      height: "",
      isShowCardWebsiteContent: true,
      background: true,
      link: true,
      linkText: {
        text: "",
        size: "",
        isBold: false,
        disabled: false,
        id: "",
        icon: "",
        href: "",
        test: ""
      },
      linkIcon: {
        text: "",
        size: "",
        isBold: false,
        disabled: false,
        id: "",
        icon: "",
        href: "",
        test: ""
      },
      wrapper: true
    }
    return card
  })

  return <>
    <section>
      <Container>
        {
          title ?
            <div>
              <h2 className="font-headings font-bold text-10 leading-12 mobile:text-6 mobile:leading-7 mb-6">{title}</h2>
            </div>
          : null
        }
        {
          description ?
            <div className="pb-14 mobile:pb-6">
              <RichtText data={{
                content: formattedDescription
              }} />
            </div>
          : null
        }
        <div className={cn('desktop:flex gap-6', { "desktop:flex-row-reverse": cardsPosition === 'right' })}>
          {
            cards ?
              <div className="desktop:w-1/2 flex flex-col justify-center">
                {
                  titleCards ? <h3 className="font-headings font-bold text-10 leading-12 mobile:text-6 mobile:leading-7 mb-6">{titleCards}</h3> : null
                }
                {
                  descriptionCards ? <div className="pb-6"><RichtText data={{ content: formattedDescriptionCards }} /></div> : null
                }
                {
                  formattedCards?.length > 0 ?
                    <div>
                      {
                        formattedCards?.map((item, i) => <div className="mb-6 w-full" key={`section-statistics-${i}`}>
                          <CardWebsite data={item} />
                        </div>
                        )
                      }
                    </div>
                    : null
                }
              </div>
            : null
          }
          {
            statistics ?
              <div className="desktop:w-1/2 flex flex-col justify-center">
                {
                  titleStatistics ? <h3 className="font-headings font-bold text-10 leading-12 mobile:text-6 mobile:leading-7 mb-6">{titleStatistics}</h3> : null
                }
                {
                  descriptionStatistics ? <div className="pb-6"><RichtText data={{ content: formattedDescriptionStatistics }} /></div> : null
                }
                {
                  statistics?.length > 0 ?
                    <div className="grid desktop:grid-cols-2 gap-6 tablet:grid-cols-2 mobile:grid-cols-1 w-full">
                      {
                        statistics.map((item: any, i: number) => <div key={`section-statistics-${i}`}>
                          <NumbersPortalverse data={{ ...item, boxShadow: true, icon: item?.iconName }} classNames="p-2 justify-center text-center" />
                        </div>)
                      }
                    </div>
                    : null
                }
              </div>
            : null
          }
        </div>
      </Container>
    </section>
  </>
};

export default CardsStatistics
