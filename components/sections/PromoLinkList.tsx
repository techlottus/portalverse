import Link from "next/link";
import Container from "@/layouts/Container.layout";
import PromoLink from "@/old-components/PromoLink/PromoLink";
import type { FC } from "react";
import type { PromoLinkListSection } from "@/utils/strapi/sections/PromoLinkList";

const PromoLinkList: FC<PromoLinkListSection> = (props: PromoLinkListSection) => {
  const { title, promoLinks, linkText, linkUrl } = props;

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
            promoLinks?.length > 0 ?
              <div className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 w-t:grid-cols-2 w-p:grid-cols-1 gap-6">
                {
                  promoLinks?.map((promoLink, index) => {
                    const {
                      text,
                      link,
                      color
                    } = promoLink;

                    return (
                      promoLink?.text ?
                        promoLink?.link ?
                          <Link key={index} href={link || "#"}>
                            <PromoLink
                              //@ts-ignore
                              data={{
                                text,
                                isShadowColor: true,
                                enable: true,
                                nobackground: true,
                                height: "100px"
                              }}
                              shadowColor={color ? color : null}
                            />
                          </Link>
                          :
                          <PromoLink
                            key={index}
                            //@ts-ignore
                            data={{
                              text,
                              isShadowColor: true,
                              enable: true,
                              nobackground: true,
                              height: "100px"
                            }}
                            shadowColor={color ? color : null}
                          />
                        : null
                    )
                  })
                }
              </div>
              : null
          }
          {
            linkUrl ?
              <div className="flex text-3.5 w-d:text-base font-texts font-bold items-center">
                <a className="hover:underline" href={linkUrl}>{linkText}</a>
                <span className="material-symbols-outlined !text-base ml-1 select-none">chevron_right</span>
              </div>
              : null
          }
        </div>
      </Container>
    </section>
  );
};

export default PromoLinkList;