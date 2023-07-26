import cn from "classnames";
import LinkContactTarget from "@/old-components/LinkContactTarget";
import Image from "@/old-components/Image";
import Icon from "@/old-components/Icon";
import Aspect from "@/components/Aspect";
import type { FC } from "react";
import type CintilloData from "@/types/Cintillo.types";

const Cintillo: FC<CintilloData> = (props: CintilloData) => {

  const {
    desktopRatio = "300/53",
    tabletRatio = "768/212",
    mobileRatio = "4/3",
  } = props;

  return (
    <>
      {/** Desktop cintillo */}
      <div className="w-t:hidden w-p:hidden">
        <Aspect ratio={desktopRatio}>
          <CintilloContent {...props} />
        </Aspect>
      </div>
      {/** Tablet cintillo */}
      <div className="w-d:hidden w-p:hidden">
        <Aspect ratio={tabletRatio}>
          <CintilloContent {...props} />
        </Aspect>
      </div>
      {/** Mobile cintillo */}
      <div className="w-d:hidden w-t:hidden">
        <Aspect ratio={mobileRatio}>
          <CintilloContent {...props} />
        </Aspect>
      </div>
    </>
  );
};

const CintilloContent = (props: CintilloData) => {
  const {
    image,
    title,
    subtitle,
    email,
    phone,
    whatsApp,
    actionLink,
    classNames,
    contentVariant = "dark",
  } = props;

  const redirectWhats = `https://api.whatsapp.com/send?phone=${whatsApp}`;

  return (
    <>
      <div className={cn("col-span-12 w-t:col-span-8 w-p:col-span-4 relative flex shrink-0 w-full h-full", classNames)}>
        <Image classNames="w-full h-full w-p:hidden w-t:hidden" src={image?.desktop!} alt="image" />
        <Image classNames="w-full h-full w-d:hidden w-p:hidden" src={image?.tablet!} alt="image" />
        <Image classNames="w-full h-full w-d:hidden w-t:hidden" src={image?.mobile!} alt="image" />
        <div className="absolute p-10">
          <h1
            className={cn(
              "font-headings font-bold",
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
              "font-texts font-normal",
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
                <span><a target="_blank" rel="noreferrer noopener" className="font-texts font-normal text-base" href={redirectWhats}>{whatsApp}</a></span>
              </div>
              : null
          }
          {
            !!actionLink
              ? <div className={cn("flex align-middle items-center space-x-2 text-black w-p:text-white", { "!text-white": contentVariant === "light" })}>
                <slot name="areaAction">{actionLink}</slot>
              </div>
              : null
          }
        </div>
      </div>
      </>
  );
};

export default Cintillo;