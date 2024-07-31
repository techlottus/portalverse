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
      <div className="tablet:hidden mobile:hidden">
        <Aspect ratio={desktopRatio}>
          <div className="w-full h-full">
            <div className={cn(`relative flex w-full h-full shrink-0`, classNames)} >
              <Image classNamesImg="object-cover" classNames="w-full h-full tablet:hidden" src={data.image?.desktop!} alt="image" />
              <Image classNamesImg="object-cover" classNames="w-full h-full desktop:hidden" src={data.image?.tablet!} alt="image" />
              {
                data?.overlayDak || data?.overlayWhite ?
                  <div className={cn("absolute w-full h-full", classNames, {
                    "bg-surface-0 opacity-50": data.overlayWhite,
                    "bg-surface-950 opacity-50": data.overlayDak
                  })}></div>
                  : null
              }
              <BannerContent {...props} />
            </div>
          </div>
        </Aspect>
      </div>
      {/** Tablet banner */}
      <div className="desktop:hidden mobile:hidden">
        <Aspect ratio={tabletRatio}>
          <div className="w-full h-full">
            <div className={cn(`relative flex w-full h-full shrink-0`, classNames)} >
              <Image classNamesImg="object-cover" classNames="w-full h-full" src={data.image?.tablet!} alt="image" />
              {
                data?.overlayDak || data?.overlayWhite ?
                  <div className={cn("absolute w-full h-full", classNames, {
                    "bg-surface-0 opacity-50": data.overlayWhite,
                    "bg-surface-950 opacity-50": data.overlayDak
                  })}></div>
                  : null
              }
              <BannerContent {...props} />
            </div>
          </div>
        </Aspect>
      </div>
      {/** Mobile banner */}
      <div className="desktop:hidden tablet:hidden">
        <Aspect ratio={mobileRatio}>
          <div className="w-full h-full">
            <div className={cn(`relative flex w-full h-full shrink-0`, classNames)} >
              <Image classNamesImg="object-cover" classNames="w-full h-full desktop:hidden tablet:hidden" src={data.image?.mobile!} alt="image" />
              <div className={cn("absolute w-full h-full", classNames, {
                "bg-surface-0 opacity-50": data.overlayWhite,
                "bg-surface-950 opacity-50": data.overlayDak
              })}></div>
              <div className={cn("absolute w-full h-full flex justify-start items-start", classNames)}
              >
                <div className="p-10">
                  {
                    data?.title
                      ? <h3 className={cn("font-headings font-bold desktop:leading-15 tablet:leading-7.5 mobile:leading-7.5 desktop:text-6.5 tablet:text-6 mobile:text-6", classNames, { "text-surface-0": data.overlayDak || data.font === "light" })}>{data.title}</h3>
                      : null
                  }
                  {
                    data?.subtitle
                      ? <h3
                          className={cn("font-texts font-normal desktop:leading-5 tablet:leading-4 mobile:leading-4 desktop:text-base tablet:text-3.5 mobile:text-3.5", classNames, { "text-surface-0": data.overlayDak || data.font === "light" })}
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
    "justify-start items-center": data?.position === "left-center",
    "justify-end items-center text-end": data?.position === "middle-right",
    "justify-center items-center text-center": data?.position === "middle-center",
    "justify-start items-end": data?.position === "left-bottom",
    "justify-center items-end text-center": data?.position === "center-bottom",
    "justify-end items-end text-end": data?.position === "right-bottom",
    "justify-end items-start text-end": data?.position === "right-top",
  });

  return (
    <div className={desktopTabletContainerClasses}>
      <div className="p-10 min-w-125 desktop:w-1/2 tablet:w-2/3">
        {
          data?.title
            ? <h3
                className={cn(
                  "font-headings font-bold text-wrap",
                  classNames,
                  {
                    "text-surface-0": data.overlayDak || data.font === "light",
                    "desktop:text-6.5 tablet:text-6 mobile:text-6 desktop:leading-15 tablet:leading-7.5 mobile:leading-7.5": variant === "lg",
                    "desktop:text-5.5 tablet:text-5.5 mobile:text-5.5 desktop:leading-15 tablet:leading-7.5 mobile:leading-7.5": variant === "md",
                    "desktop:text-4 tablet:text-4 mobile:text-4 desktop:leading-15 tablet:leading-7.5 mobile:leading-7.5": variant === "sm"
                  }
                )
                }
              >
                {data.title}
              </h3>
            : null
        }
        {
          data?.subtitle
            ? <p
                className={cn(
                  "font-texts font-normal",
                  classNames,
                  {
                    "text-surface-0": data.overlayDak || data.font === "light",
                    "desktop:leading-6 tablet:leading-4 mobile:leading-4 desktop:text-base tablet:text-3.5 mobile:text-3.5": variant === "lg",
                    "desktop:leading-5 tablet:leading-5 mobile:leading-4 desktop:text-sm tablet:text-3.5 mobile:text-3.5": variant === "md",
                    "desktop:leading-5 tablet:leading-5 mobile:leading-4 desktop:text-xs tablet:text-3.5 mobile:text-3.5": variant === "sm"
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