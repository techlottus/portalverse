import Container from "@/layouts/Container.layout"
import Image from "@/old-components/Image";
import cn from "classnames";
import type { LeaderboardSection } from "@/utils/strapi/sections/Leaderboard"

const Leaderboard = (props: LeaderboardSection) => {
  const {
    title,
    subtitleIcon,
    subtitleText,
    links,
    desktopImage,
    tabletImage,
    mobileImage,
    leaderboardContentVariant: contentVariant
  } = props;

  return (
    <section>
      <Container classNames="w-t:!p-0">
        <div
          className={cn("relative w-p:px-10 w-p:py-7 w-t:px-15 w-t:py-6 px-20 py-10 w-p:min-h-[236px] min-h-[212px]", {
            "text-white": contentVariant === "light",
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
          <div className="relative flex flex-col space-y-4">
            {
              title
                ? <h4
                    className={cn(
                      "font-Poppins font-bold",
                      "w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5",
                      "w-d:text-6.5 w-t:text-6 w-p:text-6"
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
                        ? <span className="material-icons font-normal">{subtitleIcon}</span>
                        : null
                    }
                    <span
                      className={cn(
                        "font-Nunito-Sans font-normal",
                        "w-d:leading-5 w-t:leading-[17.5px] w-p:leading-[17.5px]",
                        "w-d:text-base w-t:text-3.5 w-p:text-3.5",
                      )}
                    >
                      {subtitleText}
                    </span>
                  </div>
                : null
            }
            {
              links?.length > 0
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
                                ? <span className="material-icons font-normal">{link?.iconName}</span>
                                : null
                            }
                            {
                              link?.text
                                ? <span className="font-normal hover:underline">{link?.text}</span>
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