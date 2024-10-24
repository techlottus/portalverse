import { FC } from "react"
import RichtText from "@/old-components/Richtext/Richtext";
import { LinkComponentConfig } from "@/types/LinkListComponentS";
import { StrapiImage } from "@/types/strapi/common";

type AlertInfoType = {
  title: string;
  subtitle: string;
  link?: LinkComponentConfig;
  image?: StrapiImage;
}
const AlertInfo: FC<AlertInfoType> = (props: AlertInfoType) => {
  const { title, subtitle, link, image } = props;

  return (
    <section className="mx-3">
      <div className=" bg-surface-100 rounded-lg flex space-x-4 items-center p-4 justify-between ">
        <div className="flex space-x-3">
        {
          image
            ? <img className="" src={image?.data.attributes.url} />
            : null
        }
        <div className="flex-col space-y-1">
          {
            title
              ? <p className="font-bold font-texts text-sm text-surface-900">{title}</p>
              : null
          }
          {
            subtitle
              ? <p className="font-texts font-normal text-surface-600 text-sm " >{subtitle}</p>
              : null
          }
        </div>
        </div>
        {
          link
            ? <div className="flex justify-end">
              <a href={link?.href} target={link?.target === "blank" ? "_blank" : "_self"} rel={link?.target === "blank" ? "noreferrer" : undefined} className="flex items-center space-x-2">
                {
                  link?.iconName && link?.iconPosition === "left"
                    ? <span className="material-symbols-outlined select-none font-normal text-info-500">{link?.iconName}</span>
                    : null
                }
                {
                  link?.text
                    ? <span className="font-normal hover:underline text-info-500">{link?.text}</span>
                    : null
                }
                {
                  link?.iconName && link?.iconPosition === "right"
                    ? <span className="material-symbols-outlined select-none font-normal text-info-500">{link?.iconName}</span>
                    : null
                }
              </a>
            </div>
            : null
        }
      </div>
    </section>
  );
}

export default AlertInfo