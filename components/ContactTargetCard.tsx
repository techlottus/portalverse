import Image from "@/old-components/Image";
import LinkContactTarget from "@/old-components/LinkContactTarget";
import cn from "classnames";
import type { FC } from "react";

type ContactTargetCardData = {
  key: string;
  image: string;
  title: string;
  email: string;
  phone: string;
  link?: string;
  classNames?: string;
}

const ContactTargetCard: FC<ContactTargetCardData> = (props: ContactTargetCardData) => {
  
  const {
    image,
    title,
    email,
    phone,
    link,
    classNames,
  } = props;

  return (
    <div className={cn("bg-SC/Backgrounds/BG-GRAY flex", classNames)}>
      {
        !!image
          ?
          <Image
            classNames={cn(
              "min-w-[96px] min-h-[84px]",
              "w-d:min-w-[120px] w-d:min-h-[105px]",
              "h-full flex shrink-0 oject-cover"
              )
            }
            classNamesImg="object-cover"
            alt="contact-image"
            src={image}
          />
          : <div className="bg-[gray] rounded w-22 h-22" />
      }
      <div className="w-full flex flex-col justify-center p-3 overflow-hidden">
        <p className="font-Nunito font-bold text-sm leading-5">{title}</p>
        <a className="font-Nunito font-normal text-sm leading-5 text-SC/Blackandgrey/B-60 w-p:w-56 w-60 break-words" target="_blank" rel="noreferrer noopener" href={link}>{link}</a>
        <LinkContactTarget classNames="break-all" type="email" info={email} />
        <LinkContactTarget classNames="break-all" type="phone" info={phone} />
      </div>
    </div>
  );
};

export default ContactTargetCard;