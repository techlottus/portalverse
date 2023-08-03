import Image from "@/old-components/Image";
import LinkContactTarget from "@/old-components/LinkContactTarget";
import cn from "classnames";
import type { FC } from "react";
import type ContactTargetComponentData from "@/types/ContactPage.types";

const ContactTarget: FC<ContactTargetComponentData> = (props: ContactTargetComponentData) => {
  const {
    image,
    name,
    email,
    phone,
    link,
    classNames,
  } = props;
  return (
    <div className={cn("bg-surface-100 flex col-span-4", classNames)}>
      {
        !!image
          ?
          <Image
            classNames={cn(
              "min-w-[96px] min-h-[84px]",
              "w-d:min-w-[120px] w-d:min-h-[105px]",
              "h-full flex shrink-0"
              )
            }
            classNamesImg="object-cover"
            alt="contact-image"
            src={image}
          />
          : <div className="bg-surface-500 rounded w-22 h-22" />
      }
      <div className="w-full flex flex-col justify-center p-3 overflow-hidden">
        <p className="font-texts font-bold text-sm leading-5">{name}</p>
        <a className="font-texts font-normal text-sm leading-5 text-surface-500 w-p:w-56 w-60 break-words" target="_blank" rel="noreferrer noopener" href={link}>{link}</a>
        <LinkContactTarget type="email" info={email} />
        <LinkContactTarget type="phone" info={phone} />
      </div>
    </div>
  );
};

export default ContactTarget;