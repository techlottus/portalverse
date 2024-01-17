import Container from "@/layouts/Container.layout"
import Image from "@/old-components/Image";
import cn from "classnames";
import type { LeaderboardSection } from "@/utils/strapi/sections/Leaderboard"
import Button from "@/old-components/Button/Button";

const Leaderboard = (props: LeaderboardSection) => {
  const {
    title,
    subtitleIcon,
    subtitleText,
    links,
    desktopImage,
    tabletImage,
    mobileImage,
    leaderboardContentVariant: contentVariant,
    button,
    overlayLeaderboard
  } = props;

  const myhref = (web: string) => {
    if (!web) return;
    window.location.href = web;
  };

  return (
    <section>
      <Container classNames="w-t:!p-0">
        <div
          className={cn("relative w-p:px-10 w-p:py-7 w-t:px-15 w-t:py-6 px-20 py-10 w-p:min-h-58 min-h-54", {
            "text-surface-0": contentVariant === "light",
          })}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Mobile Image */}
            <Image classNames="w-full h-full w-t:hidden w-d:hidden" classNamesImg="object-cover" src={mobileImage?.data?.attributes?.url} alt="image" />

            {/* Tablet Image */}
            <Image classNames="w-full h-full w-p:hidden w-d:hidden" classNamesImg="object-cover" src={tabletImage?.data?.attributes?.url} alt="image" />

            {/* Desktop Image */}
            <Image classNames="w-full h-full w-p:hidden w-t:hidden" classNamesImg="object-cover" src={desktopImage?.data?.attributes?.url} alt="image" />
          </div>
          {
            overlayLeaderboard ?
              <div className={cn("absolute w-full h-full top-0 left-0 ", {
                "bg-surface-0 opacity-50": overlayLeaderboard === "white",
                "bg-surface-950 opacity-50": overlayLeaderboard === "dark"
              })}></div>
              : null
          }
          <div className="relative flex flex-col space-y-4">
            {
              title
                ? <h4
                  className={cn(
                    "font-headings font-bold",
                    "w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5",
                    "w-d:text-6.5 w-t:text-6 w-p:text-6", {
                    "text-surface-0": overlayLeaderboard === "dark",
                    "text-surface-950": overlayLeaderboard === "white"
                  }
                  )}
                >
                  {title}
                </h4>
                : null
            }
            {
              subtitleText
                ? <div className="flex items-center space-x-2">
                  {
                    subtitleIcon
                      ? <span className={cn("material-symbols-outlined font-normal", {
                        "text-surface-0": overlayLeaderboard === "dark",
                        "text-surface-950": overlayLeaderboard === "white"
                      })}>{subtitleIcon}</span>
                      : null
                  }
                  <span
                    className={cn(
                      "font-texts font-normal",
                      "w-d:leading-5 w-t:leading-4 w-p:leading-4",
                      "w-d:text-base w-t:text-3.5 w-p:text-3.5", {
                      "text-surface-0": overlayLeaderboard === "dark",
                      "text-surface-950": overlayLeaderboard === "white"
                    }
                    )}
                  >
                    {subtitleText}
                  </span>
                </div>
                : null
            }
            {button&& (
              <Button  darkOutlined= {button.variant === "outlined_negative"} dark={button.variant === "primary"} data={{
                title: button?.label,
                type: button?.variant,
                icon: button?.iconName,
                isExpand: false,            
              }}
                onClick={() =>{ myhref(button.CTA)}} />
            )}
            {
              !button && links?.length > 0
                ? <div
                  className={
                    cn(
                      "grid w-p:grid-cols-1 grid-cols-2 gap-x-12 w-p:gap-y-2 gap-y-4 w-fit"
                    )
                  }
                >
                  {
                    links?.slice(0, 4)?.map((link, i) => {
                      return (
                        <a
                          key={i}
                          href={link?.href}
                          target={link?.target === "blank" ? "_blank" : "_self"}
                          rel={link?.target === "blank" ? "noreferrer" : undefined}
                          className={cn("flex justify-self-start items-center space-x-2", {
                            "w-p:hidden": !link?.text && !link?.iconName,
                          })}
                        >
                          {
                            link?.iconName
                              ? <span className={cn("material-symbols-outlined font-normal", {
                                "text-surface-0": overlayLeaderboard === "dark",
                                "text-surface-950": overlayLeaderboard === "white"
                              })}>{link?.iconName}</span>
                              : null
                          }
                          {
                            link?.text
                              ? <span className={cn("font-normal hover:underline", {
                                "text-surface-0": overlayLeaderboard === "dark",
                                "text-surface-950": overlayLeaderboard === "white"
                              })}>{link?.text}</span>
                              : null
                          }
                        </a>
                      );
                    })
                  }
                </div>
                : null
            }
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Leaderboard;