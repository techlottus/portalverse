import { FC, useEffect, useState } from "react"
import cn from "classnames"
import LinkContactTarget from "@/old-components/LinkContactTarget"
import CintilloData from "@/types/Cintillo.types"
import Image from "@/old-components/Image"
import Icon from "@/old-components/Icon"

const Cintillo: FC<CintilloData> = (props: CintilloData) => {

  const {
    image,
    title,
    subtitle,
    email,
    phone,
    whatsApp,
    classNames,
    contentVariant = "dark",
  } = props;

  const redirectWhats = `https://api.whatsapp.com/send?phone=${whatsApp}`;

  return <div className={cn("col-span-12 w-t:col-span-8 w-p:col-span-4 relative flex", classNames)}>
    <Image classNames="w-full h-full w-p:hidden aspect-7/2 p-[110px]" src={image?.desktop!} alt="image" />
    <Image classNames="w-full h-full w-d:hidden w-t:hidden aspect-2/1" src={image?.mobile!} alt="image" />
    <div className="absolute p-10">
      <h1
        className={cn(
          "font-Poppins font-bold",
          "w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5",
          "w-d:text-6.5 w-t:text-6 w-p:text-6",
          "text-black w-p:text-white",
          {
            "!text-white": contentVariant === "light"
          }
        )}
      >
        {title}
      </h1>
      <h3
        className={cn(
          "font-Nunito-Sans font-normal",
          "w-d:leading-5 w-t:leading-[17.5px] w-p:leading-[17.5px]",
          "w-d:text-base w-t:text-3.5 w-p:text-3.5",
          "text-black w-p:text-white",
          {
            "text-white": contentVariant === "light"
          }
        )}
      >
        {subtitle}
      </h3>
      {
        !!email
          ? <div className="flex my-4 items-center">
            <span
              className={cn(
                "material-icons pr-2 pt-1 text-2 text-black w-p:text-white",
                {
                  "!text-white": contentVariant === "light"
                }
              )}
            >
              mail
            </span>
            <LinkContactTarget classNames={cn("text-black w-p:text-white", { "!text-white": contentVariant === "light" })} type="email" info={email} />
          </div>
          : null
      }
      {
        !!phone
          ? <div className="flex my-4 items-center">
            <span
              className={cn(
                "material-icons pr-2 pt-1 text-2 text-black w-p:text-white",
                {
                  "!text-white": contentVariant === "light"
                }
              )}
            >
              phone
            </span>
            <LinkContactTarget classNames={cn("text-black w-p:text-white", { "!text-white": contentVariant === "light" })} type="phone" info={phone} />
          </div>
          : null
      }
      {
        !!whatsApp
          ? <div className={cn("flex align-middle items-center space-x-2 text-black w-p:text-white", { "!text-white": contentVariant === "light" })}>
            <span className="w-6 h-6">
              <Icon name="whatsapp" />
            </span>
            <span><a target="_blank" rel="noreferrer noopener" className="font-Nunito font-normal text-base" href={redirectWhats}>{whatsApp}</a></span>
          </div>
          : null
      }
    </div>
  </div>
}

export default Cintillo