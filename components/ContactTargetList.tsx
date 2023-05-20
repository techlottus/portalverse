import { FC, memo } from "react";
import cn from "classnames";
import ContactTargetCard from "./ContactTargetCard";
import { ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";
import RichtText from "@/old-components/Richtext/Richtext";

const ContactTargetList: FC<ContactTargetListSection> = memo((props  : ContactTargetListSection) => {

  const {title, subtitle, description, cards} = props
  const parsedDescription = JSON.parse(description)
    return (
      <section className="flex flex-col space-y-9">
        {
          title && subtitle && description ?
          <div className="flex flex-col space-y-6">
            {
              title ? <h3>{title}</h3> : null
            }
            {
              subtitle ? <p>{subtitle}</p> : null
            }
            {
              description ? <div><RichtText data={{content: description}} /></div> : null
            }
          </div>
          : null
        }
        {
          cards?.length > 0 ?
          <div className="grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
          {
            cards?.map(({ title, email, phone, link = '', image }, j: number) =>
            <ContactTargetCard
              key={`card-item-${j}`}
              image={image?.data?.attributes?.url}
              title={title}
              email={email}
              phone={phone}
              link={link}
            />)
          }
        </div>
        : null
        }
      </section>
    );
  })
  
  export default ContactTargetList