import { MenuType, SubitemsType } from "@/utils/strapi/sections/Header";
import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import Link from "next/link";
import { useRouter } from "next/router";
import AlertInfo from "./AlertInfo";
import classNames from "classnames";
import BannerPortalverseWrapper from "../BannerPortalverseWrapper";
import Icon from "@/old-components/Icon"
import { link } from "fs/promises";
import Aspect from "../Aspect";
import { AnyARecord } from "dns";

// Componente principal Header
const Header = (props: MenuType) => {
  const { name, links, button, menu_items, banners, alert, social_medias = { data: [] } } = props;
  const router = useRouter();
  console.log("banners: ", banners)
  const [items, setItems] = useState(false);
  const [itemSelected, setItemSelected] = useState(false);
  const [itemSubSelected, setSubItemSelected] = useState(false);
  const [subItems, setSubItems] = useState(false);
  const [itemList, setItemList] = useState<any>([]);
  const [subItemList, setSubItemList] = useState<any>([]);
  const [open, setOpen] = useState(false)
  const [openContent, setOpenContent] = useState('')
  const [openContentMobile, setOpenContentMobile] = useState('closed')



  // Componente de enlaces
  const Links = ({ links }: { links?: (MenuType['links']) }) => (
    <div className="w-full">
      <NavigationMenu.List className="flex space-x-3 desktop:space-x-0 w-full desktop:items-center desktop:justify-end ">
        {links?.map((link?: any, i?: number) => (
          <NavigationMenu.Item key={i} className="w-1/2 desktop:w-full desktop:px-3 desktop:py-0 p-4 mobile:border-2 tablet:border-2  desktop:border-r desktop:last:border-r-0 rounded-lg desktop:rounded-none desktop:border-surface-900">
            <Link href={link?.href ?? ""} passHref>
              <p className="font-texts desktop:font-normal font-semibold text-xs desktop:text-surface-500 cursor-pointer hover:text-primary-500 w-full">
                {link?.text}
              </p>
              <span className="material-symbols-outlined desktop:!hidden inline-block text-2xl font-bold text-end w-full">arrow_forward</span>
            </Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </div>

  );

  const ButtonLinks = ({ className = "" }: { className: string }) => {
    return (
      <div id='button-links-mobile' className={classNames("desktop:hidden flex flex-col w-full tablet:max-w-100", className)}>
        <button
          onClick={() => { button?.CTA ? router.push(button?.CTA) : null }}
          className="px-4 py-3 rounded bg-surface-950 border border-surface-950 text-sm text-surface-100 font-texts hover:bg-surface-50 hover:text-surface-950 w-full">
          {button?.label}
        </button>
        <div className="desktop:hidden py-6 flex mx-auto w-full">
          <Links links={links} />
        </div>
        <div id='social-media' className="flex w-full justify-center space-x-3 pb-6">
          {social_medias?.data.length > 0 &&
            social_medias?.data.map((item: any, i: number) => <Link key={`social-${item?.attributes?.name}`} href={item?.attributes?.href} passHref target={"_blank"}>

              <Icon name={item?.attributes?.icon_name} className="w-8 h-8 text-balck" />

            </Link>)
          }
        </div>
      </div>
    )
  }

  // Componente de subitems
  const SubItems = ({ list, isSub = false, linkText, linkHref = '', label }: { list: any, isSub?: boolean, linkText?: string, linkHref?: string, label?: string }) => {

    return (
      <div className={classNames("desktop:w-[282px] tablet:w-full tablet:max-w-100 mobile:w-full tablet:h-full mobile:border-none tablet:border-none desktop:border-r border-surface-200 mobile:overflow-y-auto tablet:overflow-y-auto mobile:mb-6",
        {
          ["mobile:px-6 tablet:px-6 tablet:py-3 mobile:py-3"]: isSub,
        })}>
        {isSub &&
          <div className="desktop:hidden flex flex-col border-b border-surface-300 mobile:mb-3 tablet:mb-3">
            <div className="flex py-2 space-x-2 align-middle items-center">
              <button onClick={() => {
                subItems ? setSubItems(false) :
                  items && setItems(false)
              }
              } ><span className="material-symbols-outlined text-2xl rounded p-2 bg-surface-300 font-bold">arrow_back</span></button>
              <p className="font-semibold font-texts text-lg">{label}</p>
            </div>
            <Link href={linkHref ?? ""} passHref >
              <div className="py-2 w-full font-texts text-primary-500 font-normal flex align-middle">
                <p className={classNames("font-normal hover:underline")}>
                  {linkText && linkText + ' »'} </p>
              </div>
            </Link>
          </div>}
        <ul className={classNames("flex flex-col w-full h-full mobile:h-fit tablet:h-fit desktop:pr-6 mobile:space-y-2 tablet:space-y-2", { ["desktop:w-[273px] "]: isSub })} tabIndex={-1}  >
          {list?.map((item: any, i: number) =>
            item?.items?.length > 0 ? (
              <button key={i} className={classNames("group py-2 w-full", {
                [" rounded desktop:px-3 desktop:border desktop:border-surface-50 desktop:hover:border-surface-200 desktop:hover:bg-surface-0"]: !isSub,
                ["desktop:border desktop:!border-surface-200 desktop:bg-surface-0 "]: (!isSub && item.id === itemSelected && items)
              })}
                onMouseEnter={() => {
                  handleMouseEnter(item, isSub, true, item)
                  isSub ? setSubItemSelected(subItemList.id) : setItemSelected(itemList.id)
                }}>
                <div className="flex items-center justify-between">
                  <p className={classNames("font-normal  desktop:group-hover:text-primary-500 text-surface-500 font-texts text-wrap text-left text-base", {
                    ["desktop:text-primary-500 desktop:underline desktop:underline-offset-1"]: (!isSub && item.id === itemSelected && items) || (isSub && item.id === itemSubSelected && subItems)
                  })}>
                    {item.label}
                  </p>
                  <span className={classNames("material-symbols-outlined text-2xl desktop:group-hover:text-primary-500 text-surface-400 font-bold ml-3", { ["desktop:text-primary-500"]: (!isSub && item.id === itemSelected && items) || (isSub && item.id === itemSubSelected && subItems) })}>chevron_right</span>
                </div>
              </button>
            ) : (
              <Link key={i} href={item.href ?? ""} passHref onMouseEnter={() => {
                isSub ? setSubItems(false) : setItems(false)
              }} >
                <p className={classNames("py-2 w-full", {
                  ["desktop:px-3 rounded desktop:border desktop:border-surface-50 desktop:hover:border-surface-200 desktop:hover:bg-surface-0"]: !isSub,
                  ["font-texts text-surface-950 font-semibold"]: item.bold,
                  ["font-texts text-surface-500 desktop:hover:text-primary-500 font-normal "]: !item.bold,
                })}>{item.label}</p>
              </Link>
            )
          )}
          {linkText && <Link href={linkHref ?? ""} passHref onMouseEnter={() => {
            isSub ? setSubItems(false) : setItems(false)
            console.log(linkHref)
          }
          } className="mobile:hidden">
            <div className={classNames("py-2 w-full font-texts text-primary-500 font-normal flex align-middle", { ["desktop:px-3"]: !isSub })}>
              <p className={classNames("font-normal hover:underline text-base")}>
                {linkText ? linkText + " »" : null} </p>
            </div>
          </Link>}
        </ul>
        {isSub &&
          <ButtonLinks className="mb-50 mt-6" />
        }
      </div>
    );
  }

  const SubItemsCols = ({ subitems, linkText, linkHref = "", isSub = true }: { subitems: any; isSub?: boolean, linkText?: string, linkHref?: string }) => (
    <div className="flex flex-col w-full overflow-x-auto overscroll-x-auto desktop:max-h-[724px]">
      <ul className={classNames("flex flex-col flex-wrap max-h-100 max-w-[273px]")} tabIndex={-1} onMouseEnter={() => setItems(true)}>
        {subitems.items?.map((item: any, i: number) => (
          <Link key={i} href={item?.href ?? ""} passHref>
            <p className={classNames("font-text text-sm mr-3 mb-3",
              {
                ["font-texts text-surface-950 font-semibold"]: item?.bold,
                ["font-texts text-surface-400 hover:text-primary-500 font-normal text-wrap text-left"]: !item?.bold,
              })}>
              {item?.label}
            </p>
          </Link>
        ))}
      </ul>
      {linkText && <div className="w-full border-t border-surface-200 ">
        <div className="py-2 w-full font-texts text-primary-500 font-normal flex align-middle">
          <Link href={linkHref ?? ""} passHref>
            <p className={classNames("font-normal hover:underline text-sm")}>
              {linkText ? linkText + " »" : null} </p></Link>
        </div>
      </div>}
    </div>
  );

  const Banner = ({ textPosition, desktopRatio, desktopImage, overlay, title, subtitle,ctaUrl,ctaText }: { textPosition: string, desktopRatio: string, desktopImage: any, overlay: string, title: string, subtitle: string, ctaUrl:string,ctaText:string}) => {
    return (
      <div className="w-t:hidden w-p:hidden rounded">
        <Aspect ratio={desktopRatio}>
          <div className="w-full h-full rounded">
            <div className={classNames("relative flex w-full h-full shrink-0")} >
              <img className="w-full h-full w-t:hidden object-cover rounded" src={desktopImage?.data?.attributes.url} alt="image" />
              {
                overlay &&
                <div className={classNames("absolute w-full h-full rounded", {
                  "bg-surface-0 opacity-50": overlay == "white",
                  "bg-surface-950 opacity-50": overlay == "black"
                })}></div>
              }
              <div id="Banner-content" className={classNames("absolute w-full h-full flex", {
                "justify-center text-center": textPosition === "center",
                "justify-end text-right": textPosition === "right",
                "items-center": textPosition === "middle",
                "items-center text-center": textPosition === "middle-left",
                "justify-start items-center": textPosition === "left-center",
                "justify-end items-center text-end": textPosition === "middle-right",
                "justify-center items-center text-center": textPosition === "middle-center",
                "justify-start items-end": textPosition === "left-bottom",
                "justify-center items-end text-center": textPosition === "center-bottom",
                "justify-end items-end text-end": textPosition === "right-bottom",
                "justify-end items-start text-end": textPosition === "right-top",
              })}>
                <div className="p-10 flex flex-col space-y-2 ">
                  {
                    title && <h3
                      className={classNames(
                        "font-headings font-bold text-wrap w-d:text-5.5 w-t:text-5.5 w-p:text-5.5 w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5",
                        {
                          "text-surface-0": overlay === "black",
                        }
                      )
                      }
                    >
                      {title}
                    </h3>}
                  {
                    subtitle && <p
                      className={classNames(
                        "font-texts font-normal",
                        {
                          "text-surface-0": overlay === "black"
                        }
                      )
                      }
                      dangerouslySetInnerHTML={{ __html: String(subtitle) }}
                    />
                  }
                  {ctaUrl && 
                  <Link passHref
                  href={ ctaUrl? ctaUrl : "" }>
                    <div className={classNames("font-texts text-base flex align-middle items-center",{"text-surface-0": overlay === "black"})}>
                      <p className="underline">{ctaText}</p> 
                      <span className="ml-1 material-symbols-outlined">arrow_forward</span>
                    </div>
                </Link>
                  }

                </div>


              </div>
            </div>
          </div>
        </Aspect>
      </div>

    )
  }

  // Layout para el contenido de inicio
  const LayoutHome = ({ banners, alert }: { banners: any, alert: any }) => (
    <div className="flex flex-col space-y-3 w-full justify-between h-full mobile:hidden">
      <div className="grid desktop:grid-cols-2 gap-6 tablet:grid-cols-1 mobile:grid-cols-1">
        {
          banners?.map((item: any, i: number) => <div key={`section-banners-${i}`}>
            {/* <BannerPortalverseWrapper data={item} onClick={() => {
              router.push(item?.ctaUrl);
            }} /> */}
            <Banner {...item} />

          </div>)
        }
      </div>
      {alert && <div className="border-t border-surface-200 py-2">
        <AlertInfo {...alert} />
      </div>}
    </div>
  );

  const handleMouseEnter = (list: any[], isSub: boolean, id?: boolean, item?: any) => {
    if (!isSub) {
      setItems(true);
      setItemList(list);
    } else {
      setSubItemList(list);
      setSubItems(true)
    }
    // console.log("handle: ", items,subItems, itemList, subItemList)

  };

  const clearStates = () => {
    // console.log("clean")
    setItems(false);
    setSubItems(false)
    setItemList({});
    setSubItemList({});

  }

  const handleHamburguer = () => {
    if (open) {
      setOpen(false)
    }
    else {
      setOpen(true)
    }
  }

  useEffect(() => {
    // console.log("subitems: ",subItems)
    if (!subItems) {
      setSubItemList({})
      setSubItemSelected(false)
    }
  }, [subItems])
  useEffect(() => {
    // console.log("items: ",items)
    if (!items) {
      setSubItems(false)
      setSubItemList({})
      setSubItemSelected(false)
    }
  }, [items])


  return (
    // todo desktop sticky
    <div className="absolute desktop:fixed top-0 z-20 flex flex-col w-full tablet:fixed mobile:fixed bg-surface-0 ">
      {/* Primer nivel del menú */}
      <NavigationMenu.Root className="relative flex h-auto desktop:py-4 py-3 desktop:px-21 px-6 desktop:border-b desktop:border-surface-300 w-full justify-center align-middle bg-surface-0 tablet:z-10">
        <button className="absolute top-0 left-6 pr-3 py-3 desktop:hidden flex items-center h-full" onClick={() => handleHamburguer()}>
          {!open && <Icon name="sort" className="w-7.5 h-7.5" />}
          {open && <span className="flex align-middle items-center"><span className="mr-1 material-symbols-outlined">close</span> <p className="font-texts font-normal text-sm">Cerrar</p></span>}
        </button>
        <div className="w-full max-w-[1200px] flex desktop:justify-between justify-center">
          <div className="h-[45px] w-[104px] desktop:w-36 desktop:h-10 bg-logo bg-cover bg-center "></div>
          <div className="hidden desktop:flex items-center space-x-6">
            <Links links={links} />
            <button
              onClick={() => { button?.CTA ? router.push(button?.CTA) : null }}
              className="px-4 py-3 rounded bg-surface-950 border border-surface-950 text-sm text-surface-100 font-texts hover:bg-surface-50 hover:text-surface-950 text-nowrap">
              {button?.label}
            </button>
          </div>
        </div>
      </NavigationMenu.Root>

      {/* Segundo nivel del menú */}
      <div className={classNames(" desktop:flex w-full desktop:min-w-[1024px] h-full desktop:h-[45px] bg-surface-0 mobile:px-0 tablet:px-0  desktop:px-21 desktop:justify-center desktop:border-b desktop:border-surface-300 desktop:shadow tablet:fixed mobile:fixed tablet:top-[69px] mobile:top-[69px] tablet:overflow-y-scroll mobile:overflow-y-scroll ",
        {
          ["mobile:-translate-x-full tablet:hidden"]: !open,
          [" tablet:transition-colors tablet:duration-1000 tablet:bg-surface-950/30 tablet:ease-in-out"]: open
        })}>
        <NavigationMenu.Root value={openContent} onValueChange={setOpenContent} className={classNames("desktop:h-[45px] desktop:w-full  desktop:max-w-[1200px] h-screen overscroll-none desktop:flex tablet:data-[state=closed]:hidden tablet:transition-transform mobile:transition-transform tablet:duration-1000 mobile:duration-1000 mobile:ease-in-out", { ["tablet:-translate-x-full mobile:-translate-x-full "]: !open })}>
          <NavigationMenu.List className="mobile:w-full h-screen mobile:overflow-y-auto mobile:overscroll-y-auto desktop:h-fit desktop:w-auto flex flex-col desktop:justify-between  desktop:flex-row desktop:items-start  py-3 desktop:py-0 tablet:max-w-100 bg-surface-0 desktop:bg-transparent">
            <div className=" desktop:flex desktop:space-x-3 desktop:w-full desktop:max-w-[1200px] align-middle ">
              {menu_items?.map((menu_item, i) => (
                <NavigationMenu.Item key={i} onMouseEnter={() => {
                  setItems(false)
                  setSubItems(false)
                }}
                  className="relative px-6 desktop:flex desktop:px-0 align-middle ">
                  {menu_item?.items && menu_item?.items?.length > 0 ?
                    <NavigationMenu.Trigger onClick={() => setOpenContentMobile('open')} className={classNames("group z-20 flex justify-between desktop:justify-normal mobile:border-b tablet:border-b  w-full  items-center desktop:h-[45px]  font-texts desktop:font-normal font-semibold  border-surface-300  desktop:data-[state=open]:border-b-4 desktop:data-[state=open]:border-primary-500 desktop:data-[state=open]:text-primary-500 desktop:py-3 desktop:data-[state=open]:pb-2 py-4 desktop:px-3 ")}>
                      {menu_item?.label}
                      <div className="desktop:hidden"><span className="material-symbols-outlined text-2xl  text-surface-800 font-bold ml-3 desktop:hidden">chevron_right</span></div>
                      <CaretDownIcon className="relative hidden desktop:block transition duration-300 ease-out hover:ease-in group-data-[state=open]:rotate-180 desktop:group-data-[state=open]:text-primary-500 ml-1" aria-hidden />
                    </NavigationMenu.Trigger> : <Link href={menu_item?.href ?? ""} passHref >
                      <p className="desktop:font-normal font-semibold font-texts text-base group z-20  flex justify-between desktop:justify-normal mobile:border-b tablet:border-b  w-full  items-center desktop:h-[45px] desktop:space-x-4  border-surface-300  desktop:hover:border-b-4 desktop:hover:border-primary-500 desktop:hover:text-primary-500 desktop:py-3 desktop:hover:pb-2 py-4 desktop:px-3  ">{menu_item?.label}</p>
                    </Link>}
                  {menu_item?.items && menu_item?.items?.length > 0 && (
                    <NavigationMenu.Content id="content" className={classNames("desktop:absolute desktop:top-0 desktop:left-0 desktop:w-full desktop:data-[motion=from-start]:animate-enterFromLeft desktop:data-[motion=from-end]:animate-enterFromRight desktop:data-[motion=to-start]:animate-exitToLeft desktop:data-[motion=to-end]:animate-exitToRight mobile:z-20 tablet:max-w-100 desktop:min-h-[440px]  mobile:bg-surface-0 desktop:rounded-xl tablet:min-h-screen mobile:min-h-screen mobile:h-full mobile:overflow-y-auto mobile:overscroll-y-auto desktop:rounded-b-xl ")}
                    >
                      <div tabIndex={-1} onClick={() => setOpenContent('closed')} className={classNames("fixed top-0 w-full h-full mobile:hidden bg-surface-950/30 -z-10 tablet:-z-30 overscroll-none overflow-y-hidden")}></div>
                      <div tabIndex={-1} onMouseLeave={() => {
                        setOpenContent('closed')
                        clearStates()
                      }
                      } className="bg-surface-0  desktop:bg-surface-50 desktop:rounded-b-xl h-full desktop:min-h-[440px]  desktop:px-21 px-6 desktop:py-6 py-3 w-full tablet:max-w-100 flex desktop:flex-row flex-col desktop:justify-center tablet:z-20 mobile:overflow-y-auto mobile:overscroll-y-auto">
                        <div className="flex w-full desktop:max-w-[1200px] desktop:min-h-fit mobile:h-full tablet:h-full mobile:flex-col tablet:flex-col ">
                          <div className="">
                            <div className="desktop:hidden flex flex-col border-b border-surface-300 mobile:mb-3 tablet:mb-3">
                              <div className="flex py-2 space-x-2 align-middle items-center">
                                <button onClick={() => {
                                  setOpenContent('closed')
                                  setOpenContentMobile('closed')

                                }} ><span className="material-symbols-outlined text-2xl rounded p-2 bg-surface-300 font-bold">arrow_back</span></button>
                                <p className="font-semibold font-texts text-lg">{menu_item?.label}</p>
                              </div>
                              <Link href={menu_item?.href ?? ""} passHref >
                                <div className="py-4 w-full font-texts text-primary-500 font-normal desktop:px-3 flex align-middle">
                                  <p className={classNames("font-normal hover:underline")}>
                                    {menu_item?.linkText ? menu_item?.linkText + '»' : null} </p>
                                </div>
                              </Link>
                            </div>
                            <div tabIndex={-1} onMouseLeave={() => {
                              setSubItems(false)
                              // console.log(menu_item.linkText, menu_item.href)
                            }
                            } className="flex overflow-y-auto overscroll-auto h-full">
                              <SubItems list={menu_item?.items} linkText={menu_item?.linkText} linkHref={menu_item?.href} />
                            </div>
                          </div>
                          <div className="px-6 h-full flex w-full mobile:hidden tablet:hidden" >
                            {(items && itemList?.items && itemList?.items.length < 12) &&
                              <div className="flex space-x-6">
                                <SubItems list={itemList?.items} isSub={true} linkText={itemList?.linkText} linkHref={itemList?.href} />
                                {subItems && <SubItemsCols subitems={subItemList} isSub linkText={subItemList?.linkText} linkHref={subItemList?.href} />
                                }
                              </div>
                            }
                            {(items && itemList?.items && itemList?.items.length > 11) && <SubItemsCols subitems={itemList} linkText={itemList?.linkText} linkHref={itemList?.href} />}
                            {!items && <LayoutHome banners={banners} alert={alert} />}
                          </div>
                          <ButtonLinks className="mb-100 py-6" />
                        </div>
                        {items && <div className="desktop:hidden flex flex-col absolute top-0 w-full bg-surface-0 overflow-y-auto overscroll-auto h-full left-full  transition-transform ease-in duration-700 -translate-x-full z-30 ">
                          <SubItems list={itemList?.items} isSub linkText={menu_item?.label} linkHref={menu_item?.href} label={itemList?.label} />
                        </div>}
                        {subItems && <div className="desktop:hidden flex flex-col absolute top-0 w-full bg-surface-0 overflow-y-auto overscroll-auto h-full left-full  transition-transform ease-in duration-700 -translate-x-full z-30 ">
                          <SubItems list={subItemList?.items} isSub linkText={menu_item?.label} linkHref={menu_item?.href} label={subItemList?.label} />
                        </div>}

                      </div>
                    </NavigationMenu.Content>
                  )}
                </NavigationMenu.Item>
              ))}
            </div>
            <ButtonLinks className="p-6" />



          </NavigationMenu.List>
          {/* si borran este ya no se ve el contenido a w-full */}
          <div className={classNames("absolute w-full desktop:-z-10 desktop:overflow-y-hidden desktop:top-[113px] desktop:left-0 top-0 mobile:left-full mobile:transition-transform mobile:duration-[1000ms] mobile:ease-in-out mobile:-translate-x-full", {
            ["mobile:-translate-x-full"]: openContentMobile == 'open',
            ["mobile:translate-x-full"]: openContentMobile == 'closed',
            ["hidden"]: openContent=='closed',
          })}>
            <NavigationMenu.Viewport 
            //@ts-ignore
            style= {{"--radix-navigation-menu-viewport-height":"",height:"100%"}} 
              className={classNames("relative w-full  desktop:data-[state=open]:min-h-[600px] desktop:data-[state=closed]:h-0 desktop:max-h-[1000px] bg-surface-0 desktop:bg-transparent desktop:overflow-visible overflow-hidden tablet:max-w-100 tablet:min-h-full desktop:data-[state=open]:animate-scaleIn desktop:data-[state=closed]:animate-scaleOut")} />
          </div>
        </NavigationMenu.Root>
      </div>

    </div>
  );
};

export default Header;