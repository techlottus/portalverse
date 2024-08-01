import Container from "@/layouts/Container.layout";
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse";
import parseEditorRawData from "@/utils/parseEditorRawData";
import type { FC } from "react";
import type { CardListSection } from "@/utils/strapi/sections/CardList";

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
              ? <h2 className="font-headings text-10 font-bold leading-tight w-t:text-8.5 w-p:text-6">{title}</h2>
              : null
          }
          {
            cards?.length > 0 ?
              <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 w-t:grid-cols-2 w-p:grid-cols-1 gap-6">
                {
                  cards?.map((card, index) => {
                    const urlImage = card?.image?.data?.attributes?.url;
                    const cardContent = parseEditorRawData(card?.content);
                    const cardPosition = card?.type
                    const {
                      linkText,
                      linkUrl
                    } = card;

                    return (
                      <div key={index} className="card">
                        <CardWebsitePortalverse
                          //@ts-ignore
                          data={{
                            ...card,
                            type: cardPosition,
                            image: urlImage,
                            text: cardContent,
                            border: true,
                            isLink: !!linkUrl,
                            link: {
                              text: card?.linkText,
                              size: "medium",
                              isBold: true,
                              isUnderline: false,
                              disabled: false,
                              iconFirst: "",
                              iconSecond: ""
                            },
                            //@ts-ignore
                            linkIcon: linkText ? {
                              text: linkText,
                              disabled: !linkUrl,
                              size: "medium"
                            } : null,

                          }}
                          onClick={linkUrl ? () => {
                            if (!!linkUrl) {
                              return window?.open(linkUrl, linkUrl?.includes("https") ? "_blank" : "_self")
                            }
                            return null
                          } : undefined}
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