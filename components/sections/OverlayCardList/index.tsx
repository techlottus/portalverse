import Link from "next/link";
import Container from "@/layouts/Container.layout";
import PromoLink from "@/old-components/PromoLink/PromoLink";
import Aspect from "@/components/Aspect";
import cn from "classnames";
import type { OverlayCardListSection } from "@/utils/strapi/sections/OverlayCardList";

const OverlayCardList = (props: OverlayCardListSection) => {
  const { title, overlayCards } = props;

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-4">
          {
            title
              ? <h2 className="font-headings font-bold desktop:text-10 desktop:leading-10 text-6 leading-6">
                  {title}
                </h2>
              : null
          }
          {
            overlayCards?.length > 0
              ? <div
                  className={cn("grid w-p:gap-3 gap-6 w-t:grid-cols-2", {
                    "w-p:grid-cols-1 grid-cols-3": overlayCards?.length === 3,
                    "w-p:grid-cols-2 grid-cols-4": overlayCards?.length !== 3,
                  })}
                >
                  {
                    overlayCards?.map((card, i) => {
                      return (
                        <div key={i} className="overlay-card">
                          <Aspect ratio="1/1">
                            <Link href={card?.url || "/"}>
                              <PromoLink
                                data={{
                                  urlImage: {
                                    mobile: card?.image?.data?.attributes?.url,
                                    desktop: card?.image?.data?.attributes?.url
                                  },
                                  text: card?.title,
                                  icon: "arrow_forward",
                                  color: card?.overlayColor,
                                  opacity: "multiply",
                                  height: "100%",
                                  enable: true,
                                  nobackground: false,
                                }}
                              />
                            </Link>
                          </Aspect>
                        </div>
                      );
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

export default OverlayCardList;