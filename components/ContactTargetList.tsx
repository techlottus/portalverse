import { FC, memo, useEffect, useState } from "react";
import cn from "classnames";
import { ContactData } from "@/types/Directorio.types";
import ContactTargetComponent from "./ContactTargetComponent";

const ContactTargetList: FC<any> = memo(({ data, classNames } : any) => {

    return (
      <section className={cn("grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-2", classNames)}>
        {
          data?.map(({ name, email, phone, link = '', image = '' }: ContactData, j: number) =>
          <ContactTargetComponent
            key={`card-item-${j}`}
            image={image}
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