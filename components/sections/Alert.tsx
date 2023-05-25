import { FC } from "react"
import Container from "@/layouts/Container.layout";
import parseEditorRawData from "@/utils/parseEditorRawData";
import RichtText from "@/old-components/Richtext/Richtext";
import type { AlertSection } from "@/utils/strapi/sections/Alert"

const Alert: FC<AlertSection> = (props: AlertSection) => {
  const { title, text, links, iconName } = props;
  const richTextMarkup = parseEditorRawData(text);

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
              richTextMarkup
                ? <div style={{overflowWrap: "anywhere"}}><RichtText data={{content: richTextMarkup}}/></div>
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
                                  ? <span className="font-normal hover:underline">{link?.text}</span>
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
        </div>
      </Container>
    </section>
  );
}

export default Alert