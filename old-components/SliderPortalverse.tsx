import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/old-components/Button/Button";
import Image from "@/old-components/Image";
import Aspect from "@/components/Aspect";
import cn from "classnames";
import type { FC } from "react";

type SliderPortalverseProps = {
  data?: any;
  onBtn?: any;
  classNames?: string;
  mobile?: boolean;
};

const validateTextPosition = (textPosition: string, position: string) => {
  return !!textPosition?.split("_")?.[0]?.includes(position);
};

const SliderPortalverse: FC<SliderPortalverseProps> = (
  {
    data,
    onBtn,
    classNames,
    mobile = false
  }: SliderPortalverseProps
) => {
  const router = useRouter()

  const stylesBaseControls = "w-p:hidden select-none absolute top-[45%] p-1 rounded-lg text-[12px]";

  const [active, setActive] = useState<number>(0);
  const [countItems, setCountItems] = useState<number>(0);
  const [slides, setSlides] = useState<Array<any>>([]);
  const [changeDetect, setChangeDetect] = useState<number>(0);
  const [wMob, setWMob] = useState<string>("0px");
  const [dir, setDir] = useState<any>({ xDown: null, yDown: null })
  const [typeDir, setTypeDir] = useState<any>(null)
  const [flag, setFlag] = useState<any>(false)

  const detectResize = () => {
    setChangeDetect((prevState: number) => prevState + 1);
  }

  const getTouches = (evt: any) => {
    return evt.touches ||             // browser API
      evt.originalEvent.touches; // jQuery
  }

  const handleTouchMove = (evt: any) => {
    setDir((val: any) => {
      if (!val?.xDown || !val?.yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = val?.xDown - xUp;
      var yDiff = val?.yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
          setTypeDir("left")
          /* right swipe */
        } else {
          setTypeDir("right")
          /* left swipe */
        }
      } else {
        if (yDiff > 0) {
          /* down swipe */
        } else {
          /* up swipe */
        }
      }
      /* reset values */
      return { xDown: null, yDown: null }
    })

  };

  const handleTouchStart = (evt: any) => {
    const firstTouch = getTouches(evt)[0];
    setDir({ xDown: firstTouch.clientX, yDown: firstTouch.clientY })
  }

  useEffect(() => {
    let ignore = false
    if (mobile) {
      ignore = true
      document.querySelector("#sectionRef")?.addEventListener('touchstart', handleTouchStart, false);
      document.querySelector("#sectionRef")?.addEventListener('touchmove', handleTouchMove, false)
    }
    setFlag(true)
    detectResize();
    window.addEventListener('resize', detectResize);
    return () => {
      ignore = true
      window.removeEventListener('resize', detectResize);
      document.querySelector("#sectionRef")?.removeEventListener("touchstart", handleTouchStart)
      document.querySelector("#sectionRef")?.removeEventListener("touchmove", handleTouchMove)

    }
  }, []);

  useEffect(() => {
    const { outerWidth } = window;
    if (outerWidth < 600) {
      setWMob(`${outerWidth}px`)
    }
  }, [changeDetect]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCountItems(data.slides.length);
    setSlides([...data.slides]);
  }, [data])

  useEffect(() => {
    if (typeDir !== null) {
      handlerClickControl({ target: { ariaLabel: null } })
      setTypeDir(null)
    }
  }, [typeDir])

  useEffect(() => {
    if (slides.length > 0 && !flag) {
      setFlag(true)
    }

  }, [slides, flag])

  const onBtnSlider = () => {
    if (!!onBtn) {
      onBtn();
    }
  }

  const handlerClickControl = ({ target }: any) => {
    const { ariaLabel } = target
    if (countItems > 1) {
      if (ariaLabel === "next" || typeDir === "left") {
        if (active === countItems - 1) {
          setActive(0);
          return
        }
        if (active < countItems) {
          setActive((prevState: number) => prevState + 1);
          return
        }
      }

      if (ariaLabel === "prev" || typeDir === "right") {
        if (active === 0) {
          setActive(countItems - 1);
          return
        }
        if (active > 0) {
          setActive((prevState: number) => prevState - 1);
          return
        }
      }
    }
  };

  const activeBulletSlide = (position: number) => setActive(position);

  return <section className="relative z-0 w-p:shadow-lg">
    {/* desktop */}
    <div className="w-p:hidden">
      <Aspect ratio="2/1">
        <div className="w-full h-full">
          <div
          aria-label="prev"
          onClick={handlerClickControl}
          className={cn(
              "flex justify-center items-center z-20 left-8 w-14 h-14",
              { "bg-white/50 cursor-pointer": countItems > 1 }
              , stylesBaseControls
            )}
          >
          <span className="material-icons ml-2 pointer-events-none">arrow_back_ios</span>
        </div>
        <section className="w-full h-full flex overflow-hidden">
          {
            slides?.map((item: any, i: number) => {
              const textPositionClasses = cn({
                ["text-left"]: validateTextPosition(item?.textPosition, "left"),
                ["text-center"]: validateTextPosition(item?.textPosition, "center"),
                ["text-right"]: validateTextPosition(item?.textPosition, "right")
              });

              return (<div key={`slide-item-${i}`} style={{ "transition": "left 0.5s ease-out", "left": `${active === 0 ? 0 : `-${active * 100}%`}` }} className={cn("w-full h-full relative flex flex-col shrink-0")}>
                <Image classNames="w-t:hidden w-full h-full absolute z-1" classNamesImg="w-full h-full object-cover" src={item.urlImage.desktop} alt="image" />
                <Image classNames="w-d:hidden w-full h-full absolute z-1" classNamesImg="w-full h-full object-cover" src={item.urlImage.tablet} alt="image" />
                <div className={cn("flex absolute z-10 pt-12 pb-16 px-32 w-full h-full", {
                  "text-white": item?.contentVariant === "light",
                  ["justify-start items-start"]: item?.textPosition === "left_top",
                  ["justify-center items-start"]: item?.textPosition === "center_top",
                  ["justify-end items-start"]: item?.textPosition === "right_top",
                  ["justify-start items-center"]: item?.textPosition === "left_center",
                  ["justify-center items-center"]: item?.textPosition === "center",
                  ["justify-end items-center"]: item?.textPosition === "right_center",
                  ["justify-start items-end"]: item?.textPosition === "left_bottom",
                  ["justify-center items-end"]: item?.textPosition === "center_bottom",
                  ["justify-end items-end"]: item?.textPosition === "right_bottom"
                })}>
                  <div className="flex flex-col z-10 w-d:w-[500px] w-t:w-[392px] space-y-4">
                    <h2
                      className={cn(
                        "font-Poppins font-bold w-d:text-10 w-d:leading-[50px] w-t:text-[30px] w-t:leading-9",
                        textPositionClasses
                      )}
                    >
                      {item?.title}
                    </h2>
                    <p
                      className={cn(
                        "font-Poppins font-semibold w-d:text-4.5 w-d:leading-6 w-t:text-base w-t:leading-5",
                        textPositionClasses
                      )}
                    >
                      {item?.text}
                    </p>
                    {
                      !!item?.action?.title
                        ? <div className={cn("w-full flex", {
                            ["justify-center"]: item?.textPosition === "center_top" || item?.textPosition === "center" || item?.textPosition === "center_bottom",
                            ["justify-start"]: item?.textPosition === "left_top" || item?.textPosition === "left_bottom",
                            ["justify-end"]: item?.textPosition === "right_top" || item?.textPosition === "right_bottom" || item?.textPosition === "right_center",
                          })}>
                            <Button
                              darkOutlined={item?.contentVariant === "light"}
                              dark={item?.contentVariant === "dark"}
                              data={{ ...item.action }}
                              onClick={() => router.push(`${item.action.redirect}`)}
                            />
                          </div>
                        : null
                    }
                  </div>
                </div>
                {
                  item?.overlayWhite || item?.overlayDak ?
                    <div className={cn("absolute w-full h-full", classNames, {
                      "bg-[#ffffff80]": item.overlayWhite,
                      "bg-[#00000080]": item.overlayDak
                    })}></div>
                  : null
                }
              </div>)
            })
          }
          <div className={cn("w-full flex justify-center absolute bottom-10 space-x-2 z-20")}>
            {
              slides?.map((_: any, i: number) => <div key={`bullet-item-${i}`} onClick={() => activeBulletSlide(i)} className={cn("h-4 bg-[#686868] rounded-full cursor-pointer", { "w-4": i !== active, "w-8": i === active })} />)
            }
          </div>
        </section>
        <div
          aria-label="next"
          onClick={handlerClickControl}
          className={cn(
              "flex justify-center items-center z-10 right-8 w-14 h-14",
              { "bg-white/50 cursor-pointer": countItems > 1 }, stylesBaseControls
            )}
          >
            <span className="material-icons ml-0.5 pointer-events-none">arrow_forward_ios</span>
          </div>
        </div>
      </Aspect>
    </div>
    {/* desktop */}

    {/* mobile */}
    <section id="sectionRef" className={cn("w-full h-auto flex overflow-hidden w-d:hidden w-t:hidden")}>
      {
        slides?.map((item: any, i: number) => <div key={`slide-item-${i}`} style={{ "transition": "left 0.5s ease-out", "left": `${active === 0 ? 0 : `-${active * 100}%`}` }} className={cn("w-full h-auto relative flex flex-col shrink-0")}>
          <Aspect ratio="1/1">
            <Image classNames="w-full h-full" classNamesImg="w-full h-full object-cover" src={item.urlImage.mobile} alt="image" />
          </Aspect>
          <div className="p-4 flex flex-col space-y-6">
            <h2
              className="font-Poppins font-bold w-t:font-normal text-6 w-t:text-[32px] leading-8 w-t:leading-10"
            >
              {item.title}
            </h2>
            <p className="font-Nunito-Sans font-normal text-base leading-5">{item.text}</p>
            {
              !!item?.action?.title
                ? <Button data={{ ...item.action, isExpand: true }} dark onClick={() => router.push(`${item.action.redirect}`)} />
                : null
            }
          </div>
        </div>)
      }
    </section>
    <div className={cn("w-full flex justify-center space-x-2 mt-4 pb-5 w-t:pb-4 w-d:hidden w-t:hidden")}>
      {
        slides?.map((_: any, i: number) => <div key={`bullet-item-${i}`} onClick={() => activeBulletSlide(i)} className={cn("h-4 bg-[#DDDDDD] rounded-full cursor-pointer", { "w-4": i !== active, "w-8": i === active })} />)
      }
    </div>
    {/* mobile */}
  </section>
};

export default SliderPortalverse;
