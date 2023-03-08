import { FC } from "react"
import cn from "classnames"
import Image from "@/old-components/Image"
import LinkContactTarget from "@/old-components/LinkContactTarget"
import ContactTargetComponentData from "@/types/ContactPage.types"

const ContactTarget: FC<ContactTargetComponentData> = ({ image, name, email, phone, classNames }: ContactTargetComponentData) => {
  return <div className={cn("bg-SC/Backgrounds/BG-GRAY flex col-span-4", classNames)}>
    {
      !!image
        ? <Image classNames="aspect-1/1 w-[88px]" alt="contact-image" src={image} />
        : <div className="bg-[gray] rounded w-22 h-22" />
    }
    <div className="flex flex-col justify-center p-3">
      <p className="font-Nunito font-bold text-base leading-5.2">{name}</p>
      <LinkContactTarget type="email" info={email} />
      <LinkContactTarget type="phone" info={phone} />
    </div>
  </div>
}

export default ContactTarget