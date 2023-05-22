import { FC } from "react"
import { AlertSection } from "@/utils/strapi/sections/Alert"
import Container from "@/layouts/Container.layout";

const Alert: FC<AlertSection> = (props: AlertSection) => {
  const { title, links, iconName } = props;
  const text = props?.text as any;

  return (
    <section>
      <Container>
        <div className="border-2 rounded-lg flex space-x-4 items-start p-4">
          {
            iconName
              ? <span className="material-icons text-SC/Blackandgrey/B-60 text-4.5!">{iconName}</span>
              : null
          }
          <div className="flex flex-col space-y-4">
            {
              title
                ? <p className="font-normal text-4">{title}</p>
                : null
            }
            {
              text
                ? <p className="font-normal">{text}</p>
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
                              ? <span className="font-normal hover:underline">{link?.text}</span>
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
        </div>
      </Container>
    </section>
  );
}

export default Alert