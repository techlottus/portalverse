import Container from "@/layouts/Container.layout";
import CardWebsite from "@/old-components/CardWebsite";
import type { FC } from "react";
import type { CardListSection } from "@/utils/strapi/sections/CardList";
import parseEditorRawData from "@/utils/parseEditorRawData";

const CardList: FC<CardListSection> = (props: CardListSection) => {
  const {
    title,
    cards,
  } = props;

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {
            title
              ? <h3 className="font-Poppins text-10 font-bold leading-[125%] w-t:text-8.5 w-p:text-6">{title}</h3>
              : null
          }
          {
            cards?.length > 0 ?
              <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 w-d:mb-12 w-p:mb-6">
                {
                  cards?.map((card, index) => {
                    const urlImage = card?.image?.data?.attributes?.url;
                    const cardContent = parseEditorRawData(card?.content);
                    const {
                      linkText,
                      linkUrl
                    } = card;

                    return (
                      <div key={index} className="card">
                          <CardWebsite
                            //@ts-ignore
                            data={{
                              ...card,
                              type: "vertical",
                              urlImage,
                              text: cardContent,
                              wrapper: true,
                              //@ts-ignore
                              linkIcon: linkText ? {
                                text: linkText,
                                disabled: !linkUrl,
                                size: "medium"
                              } : null,
                              link: true,
                            }}
                            onClick={() => {
                              if (!!linkUrl) {
                                return window?.open(linkUrl, "_self")
                              }
                              return null
                            }}
                          />
                      </div>
                    )
                  })
                }
              </div>
              : null
          }
        </div>
      </Container>
    </section>
  );
};

export default CardList;