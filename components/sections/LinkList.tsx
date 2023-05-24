import { FC, memo } from "react";
import Container from "@/layouts/Container.layout";
import type { LinkListSection } from "@/utils/strapi/sections/LinkList";

const LinkList: FC<LinkListSection> = memo((props: LinkListSection) => {
  const { title, links } = props;

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
            links?.length > 0
              ? <div className="flex flex-col items-start space-y-4">
                  {
                    links?.map((link, i) => {
                      return (
                        link?.href && link?.href
                          ? <a key={i} href={link?.href} target={link?.target === "blank" ? "_blank" : "_self"} rel={link?.target === "blank" ? "noreferrer" : undefined} className="flex items-center space-x-2">
                              {
                                link?.iconName && link?.iconPosition === "left"
                                  ? <span className="material-icons font-normal">{link?.iconName}</span>
                                  : null
                              }
                              {
                                link?.text
                                  ? <span className="font-normal underline">{link?.text}</span>
                                  : null
                              }
                              {
                                link?.iconName && link?.iconPosition === "right"
                                  ? <span className="material-icons font-normal">{link?.iconName}</span>
                                  : null
                              }
                            </a>
                          : null
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
})

export default LinkList