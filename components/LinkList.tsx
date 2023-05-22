import { FC, memo } from "react";
import { LinkListSection } from "@/utils/strapi/sections/LinkList";
import Container from "@/layouts/Container.layout";

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
                      <a key={i} href={link?.href} target={link?.target === "blank" ? "_blank" : "_self"} rel={link?.target === "blank" ? "noreferrer" : undefined} className="flex items-center space-x-2">
                        {
                          link?.iconPosition === "left"
                            ? <span className="material-icons font-normal">{link?.iconName}</span>
                            : null
                        }
                        {
                          link?.text
                            ? <span className="font-normal underline">{link?.text}</span>
                            : null
                        }
                        {
                          link?.iconPosition === "right"
                            ? <span className="material-icons font-normal">{link?.iconName}</span>
                            : null
                        }
                      </a>
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