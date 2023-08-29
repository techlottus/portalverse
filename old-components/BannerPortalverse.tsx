import { FC, memo } from "react";
import BannerPortalverseComponentData from "@/types/BannerPortalverse.types";
import Image from "@/old-components/Image";
import Button from "@/old-components/Button/Button";
import cn from "classnames";
import Aspect from "@/components/Aspect";

const BannerPortalverse: FC<BannerPortalverseComponentData> = memo((props: BannerPortalverseComponentData) => {
  const {
    data,
    classNames,
    onClick
  } = props;

  const desktopRatio = data?.desktopRatio || "7/2";
  const tabletRatio = data?.tabletRatio || "7/2";
  const mobileRatio = data?.mobileRatio || "4/3";

  return (
    <>
      {/** Desktop banner */}
      <div className="w-t:hidden w-p:hidden">
        <Aspect ratio={desktopRatio}>
          <div className="w-full h-full">
            <div className={cn(`relative flex w-full h-full shrink-0`, classNames)} >
              <Image classNamesImg="object-cover" classNames="w-full h-full w-t:hidden" src={data.image?.desktop!} alt="image" />
              <Image classNamesImg="object-cover" classNames="w-full h-full w-d:hidden" src={data.image?.tablet!} alt="image" />
              {
                data?.overlayDak || data?.overlayWhite ?
                  <div className={cn("absolute w-full h-full", classNames, {
                    "bg-[#ffffff80]": data.overlayWhite,
                    "bg-[#00000080]": data.overlayDak
                  })}></div>
                  : null
              }
              <BannerContent {...props} />
            </div>
          </div>
        </Aspect>
      </div>
      {/** Tablet banner */}
      <div className="w-d:hidden w-p:hidden">
        <Aspect ratio={tabletRatio}>
          <div className="w-full h-full">
            <div className={cn(`relative flex w-full h-full shrink-0`, classNames)} >
              <Image classNamesImg="object-cover" classNames="w-full h-full" src={data.image?.tablet!} alt="image" />
              {
                data?.overlayDak || data?.overlayWhite ?
                  <div className={cn("absolute w-full h-full", classNames, {
                    "bg-[#ffffff80]": data.overlayWhite,
                    "bg-[#00000080]": data.overlayDak
                  })}></div>
                  : null
              }
              <BannerContent {...props} />
            </div>
          </div>
        </Aspect>
      </div>
      {/** Mobile banner */}
      <div className="w-d:hidden w-t:hidden">
        <Aspect ratio={mobileRatio}>
          <div className="w-full h-full">
            <div className={cn(`relative flex w-full h-full shrink-0`, classNames)} >
              <Image classNamesImg="object-cover" classNames="w-full h-full w-d:hidden w-t:hidden" src={data.image?.mobile!} alt="image" />
              <div className={cn("absolute w-full h-full", classNames, {
                "bg-[#ffffff80]": data.overlayWhite,
                "bg-[#00000080]": data.overlayDak
              })}></div>
              <div className={cn("absolute w-full h-full flex justify-start items-start", classNames)}
              >
                <div className="p-10">
                  {
                    data?.title
                      ? <h1 className={cn("font-Poppins font-bold w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5 w-d:text-6.5 w-t:text-6 w-p:text-6", classNames, { "text-white": data.overlayDak || data.font === "light" })}>{data.title}</h1>
                      : null
                  }
                  {
                    data?.subtitle
                      ? <h3
                          className={cn("font-Nunito-Sans font-normal w-d:leading-5 w-t:leading-[17.5px] w-p:leading-[17.5px] w-d:text-base w-t:text-3.5 w-p:text-3.5", classNames, { "text-white": data.overlayDak || data.font === "light" })}
                          dangerouslySetInnerHTML={{ __html: String(data.subtitle) }}
                        />
                      : null
                  }
                </div>
              </div>
            </div>
          </div>
        </Aspect>
        <div>
          {
            !data?.noAction && data?.button?.title
              ? <div className="mt-2"><Button dark data={{ ...data.button, isExpand: true }} onClick={onClick} /></div>
              : null
          }
        </div>
      </div>
    </>
  );
});

const BannerContent = (props: BannerPortalverseComponentData) => {
  const {
    data,
    classNames,
    onClick
  } = props;

  const { variant = "lg" } = data;

  const renderButton = () => {
    return (
      <>
        {!data.noAction && data.overlayDak ? (
          <div
            className={cn("mt-2 flex", classNames, {
              "justify-end": data.position === "right",
              "justify-center": data.position === "center",
              "items-center justify-center": data.position === "middle-center",
              "items-center justify-end": data.position === "middle-right",
              "items-end": data.position === "left-bottom",
              "items-end justify-center": data.position === "center-bottom",
              "items-end justify-end": data.position === "right-bottom",
              "items-start justify-end": data.position === "right-top",
            })}
          >
            <Button darkOutlined data={data?.button} onClick={onClick} />
          </div>
        ) : !data.noAction && data.overlayWhite ? (
          <div
            className={cn("mt-2 flex", classNames, {
              "justify-end": data.position === "right",
              "justify-center": data.position === "center",
              "items-center justify-center": data.position === "middle-center",
              "items-center justify-end": data.position === "middle-right",
              "items-end": data.position === "left-bottom",
              "items-end justify-center": data.position === "center-bottom",
              "items-end justify-end": data.position === "right-bottom",
              "items-start justify-end": data.position === "right-top",
            })}
          >
            <Button dark data={data.button} onClick={onClick} />
          </div>
        ) : !data.noAction && data.font === "light" ? (
          <div
            className={cn("mt-2 flex", classNames, {
              "justify-end": data.position === "right",
              "justify-center": data.position === "center",
              "items-center justify-center": data.position === "middle-center",
              "items-center justify-end": data.position === "middle-right",
              "items-end": data.position === "left-bottom",
              "items-end justify-center": data.position === "center-bottom",
              "items-end justify-end": data.position === "right-bottom",
              "items-start justify-end": data.position === "right-top",
            })}
          >
            <Button darkOutlined data={data?.button} onClick={onClick} />
          </div>
        ) : data.noAction ? null : (
          <div
            className={cn("mt-2 flex", classNames, {
              "justify-end": data.position === "right",
              "justify-center": data.position === "center",
              "items-center justify-center": data.position === "middle-center",
              "items-center justify-end": data.position === "middle-right",
              "items-end": data.position === "left-bottom",
              "items-end justify-center": data.position === "center-bottom",
              "items-end justify-end": data.position === "right-bottom",
              "items-start justify-end": data.position === "right-top",
            })}
          >
            <Button dark data={data?.button} onClick={onClick} />
          </div>
        )}
      </>
    );
  };

  const desktopTabletContainerClasses = cn("absolute w-full h-full flex", classNames, {
    "justify-center text-center": data?.position === "center",
    "justify-end text-right": data?.position === "right",
    "items-center": data?.position === "middle",
    "items-center text-center": data?.position === "middle-left",
    "justify-end items-center text-end": data?.position === "middle-right",
    "justify-center items-center text-center": data?.position === "middle-center",
    "justify-start items-end": data?.position === "left-bottom",
    "justify-center items-end text-center": data?.position === "center-bottom",
    "justify-end items-end text-end": data?.position === "right-bottom",
    "justify-end items-start text-end": data?.position === "right-top",
  });

  return (
    <div className={desktopTabletContainerClasses}>
      <div className="p-10">
        {
          data?.title
            ? <h1
                className={cn(
                  "font-Poppins font-bold",
                  classNames,
                  {
                    "text-white": data.overlayDak || data.font === "light",
                    "w-d:text-6.5 w-t:text-6 w-p:text-6 w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5": variant === "lg",
                    "w-d:text-[22px] w-t:text-[22px] w-p:text-[22px] w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5": variant === "md",
                    "w-d:text-4 w-t:text-4 w-p:text-4 w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5": variant === "sm"
                  }
                )
                }
              >
                {data.title}
              </h1>
            : null
        }
        {
          data?.subtitle
            ? <h3
                className={cn(
                  "font-Nunito-Sans font-normal",
                  classNames,
                  {
                    "text-white": data.overlayDak || data.font === "light",
                    "w-d:leading-6 w-t:leading-[17.5px] w-p:leading-[17.5px] w-d:text-base w-t:text-3.5 w-p:text-3.5": variant === "lg",
                    "w-d:leading-5 w-t:leading-5 w-p:leading-4 w-d:text-sm w-t:text-3.5 w-p:text-3.5": variant === "md",
                    "w-d:leading-5 w-t:leading-5 w-p:leading-4 w-d:text-xs w-t:text-3.5 w-p:text-3.5": variant === "sm"
                  }
                )
                }
                dangerouslySetInnerHTML={{ __html: String(data.subtitle) }}
              />
            : null
        }
        {
          data?.button?.title
            ? renderButton()
            : null
        }
      </div>
    </div>
  );
};

export default BannerPortalverse;