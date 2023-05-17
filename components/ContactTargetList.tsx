import { FC, memo } from "react";
import cn from "classnames";
import ContactTargetCard from "./ContactTargetCard";
import { ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";

const ContactTargetList: FC<ContactTargetListSection> = memo(({ cards } : ContactTargetListSection) => {

    return (
      <section className={cn("grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-2")}>
        {
          cards?.map(({ name, email, phone, link = '', image }, j: number) =>
          <ContactTargetCard
            key={`card-item-${j}`}
            image={image.data.attributes.url}
            name={name}
            email={email}
            phone={phone}
            link={link}
          />)
        }
      </section>
    );
  })
  
  export default ContactTargetList