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

// Componente principal Header
const Header = (props: MenuType) => {
  const { name, links, button, menu_items, banners, alert } = props;
  const router = useRouter();

  const [items, setItems] = useState(false);
  const [itemSelected, setItemSelected] = useState(false);
  const [itemSubSelected, setSubItemSelected] = useState(false);
  const [subItems, setSubItems] = useState(false);
  const [itemList, setItemList] = useState<any>([]);
  const [subItemList, setSubItemList] = useState<any>([]);

  

  // Componente de enlaces
  const Links = ({ links }: { links?: (MenuType['links']) }) => (
    <div className="w-full">
      <NavigationMenu.List className="flex space-x-3 desktop:space-x-0 w-full desktop:items-center desktop:justify-end ">
        {links?.map((link?: any, i?: number) => (
          <NavigationMenu.Item key={i} className="w-1/2 desktop:w-full desktop:px-3 desktop:py-0 p-4 mobile:border-2 tablet:border-2  desktop:border-r desktop:last:border-r-0 rounded-lg desktop:rounded-none desktop:border-surface-900">
            <Link href={link?.href ?? ""} passHref>
              <p className="font-headings desktop:font-normal font-semibold text-xs desktop:text-surface-500 cursor-pointer hover:text-primary-500 w-full">
                {link?.text}
              </p>
              <span className="material-symbols-outlined desktop:!hidden inline-block text-2xl font-bold text-end w-full">arrow_forward</span>
            </Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </div>

  );

  // Componente de subitems
  const SubItems = ({ list, isSub = false, linkText, linkHref = '', label }: { list: any, isSub?: boolean, linkText?: string, linkHref?: string, label?: string }) => {

    return (
      <div className={classNames("desktop:w-[282px] tablet:w-full tablet:max-w-100 mobile:w-full tablet:h-full mobile:border-none tablet:border-none desktop:border-r border-surface-200 mobile:overflow-y-auto tablet:overflow-y-auto mobile:mb-6", { ["mobile:px-6 tablet:px-6 tablet:py-3 mobile:py-3"]: isSub })}>
        {isSub && <div className="desktop:hidden flex flex-col border-b border-surface-300 mobile:mb-3 tablet:mb-3">
          <div className="flex py-2 space-x-2 align-middle items-center">
            <button onClick={() => {
              subItems ? setSubItems(false) :
                items && setItems(false)
            }
            } ><span className="material-symbols-outlined text-2xl rounded p-2 bg-surface-300 font-bold">arrow_back</span></button>
            <p className="font-semibold font-texts text-lg">{label}</p>
          </div>
          <Link href={linkHref || ""} passHref >
            <div className="py-2 w-full font-texts text-primary-500 font-normal flex align-middle">
              <p className={classNames("font-normal hover:underline")}>
                {linkText && linkText + ' »'} </p>
            </div>
          </Link>
        </div>}
        <ul className={classNames("flex flex-col w-full h-full mobile:h-fit tablet:h-fit desktop:pr-6 mobile:space-y-2 tablet:space-y-2", { ["desktop:w-[273px] "]: isSub })} tabIndex={-1}  >
          {list?.map((item: any, i: number) =>
            item?.items?.length > 0 ? (
              <button key={i} className={classNames("group rounded desktop:px-3 py-2 w-full desktop:hover:border desktop:hover:border-surface-200 text-primary-500 desktop:hover:pt-[7px] desktop:hover:pb-[8px] desktop:hover:px-[11px]", { ["desktop:pt-[7px] desktop:pb-[8px] desktop:px-[11px] desktop:border desktop:border-surface-200"]: (!isSub && item.id === itemSelected && items) || (isSub && item.id === itemSubSelected && subItems) })}
                onMouseEnter={() => {
                  handleMouseEnter(item, isSub, true, item)
                  isSub ? setSubItemSelected(subItemList.id) : setItemSelected(itemList.id)
                }}>
                <div className="flex items-center justify-between">
                  <p className={classNames("font-normal  desktop:group-hover:text-primary-500 text-surface-500 font-texts text-wrap text-left text-base", { ["desktop:text-sm"]: isSub, ["desktop:text-primary-500 desktop:underline desktop:underline-offset-1"]: (!isSub && item.id === itemSelected && items) || (isSub && item.id === itemSubSelected && subItems) })}>
                    {item.label}
                  </p>
                  <span className={classNames("material-symbols-outlined text-2xl desktop:group-hover:text-primary-500 text-surface-400 font-bold ml-3", { ["desktop:text-primary-500"]: (!isSub && item.id === itemSelected && items) || (isSub && item.id === itemSubSelected && subItems) })}>chevron_right</span>
                </div>
              </button>
            ) : (
              <Link key={i} href={item.href ?? ""} passHref onMouseEnter={() => {
                isSub ? setSubItems(false) : setItems(false)
              }} >
                <p className={classNames("py-2 w-full rounded desktop:hover:border desktop:hover:border-surface-200 desktop:hover:pt-[7px] desktop:hover:pb-[8px] desktop:hover:px-[11px]", { ["font-heading text-surface-950 font-semibold"]: item.bold, ["font-texts text-surface-500 desktop:hover:text-primary-500 font-normal desktop:px-3"]: !item.bold, ["desktop:text-sm"]: isSub })}>{item.label}</p>
              </Link>
            )
          )}
          <Link href={linkHref ? linkHref : ""} passHref onMouseEnter={() => { isSub ? setSubItems(false) : setItems(false) }} className="mobile:hidden">
            <div className="py-2 w-full font-texts text-primary-500 font-normal desktop:px-3 flex align-middle">
              <p className={classNames("font-normal hover:underline text-base")}>
                {linkText ? linkText + " »" : null} </p>
            </div>
          </Link>
        </ul>
        {isSub && <div className="desktop:hidden mt-6 flex flex-col w-full tablet:max-w-100 mb-50">
          <button
            onClick={() => { button?.CTA ? router.push(button?.CTA) : null }}
            className="px-4 py-3 rounded bg-surface-950 border border-surface-950 text-sm text-surface-100 font-texts hover:bg-surface-50 hover:text-surface-950 w-full">
            {button?.label}
          </button>
          <div className="desktop:hidden py-6 flex mx-auto w-full">
            <Links links={links} />
          </div>
        </div>}
      </div>
    );
  }

  const SubItemsCols = ({ subitems, linkText, linkHref = "", isSub = true }: { subitems: any; isSub?: boolean, linkText?: string, linkHref?: string }) => (
    <div className="flex flex-col w-full overflow-x-auto overscroll-x-auto">
      <ul className={classNames("flex flex-col flex-wrap max-h-100 max-w-[273px]")} tabIndex={-1} onMouseEnter={() => setItems(true)}>
        {subitems.items?.map((item: any, i: number) => (
          <Link key={i} href={item?.href ?? ""} passHref>
            <p className={classNames("font-text text-sm mr-3 mb-3",
              {
                ["font-heading text-surface-950 font-semibold"]: item?.bold,
                ["font-texts text-surface-400 hover:text-primary-500 font-normal text-wrap text-left"]: !item?.bold,
              })}>
              {item?.label}
            </p>
          </Link>
        ))}
      </ul>
      {linkText &&<div className="w-full border-t border-surface-200 ">
        <div className="py-2 w-full font-texts text-primary-500 font-normal flex align-middle">
          <Link href={linkHref ?? ""} passHref>
            <p className={classNames("font-normal hover:underline text-sm")}>
              {linkText ? linkText + " »" : null} </p></Link>
        </div>
      </div>}
    </div>
  );

  // Layout para la página de inicio
  const LayoutHome = ({ banners, alert }: { banners: any, alert: any }) => (
    <div className="flex flex-col space-y-3 w-full justify-between h-full mobile:hidden">
      <div className="grid desktop:grid-cols-2 gap-6 tablet:grid-cols-1 mobile:grid-cols-1">
        {
          banners?.map((item: any, i: number) => <div key={`section-banners-${i}`}>
            <BannerPortalverseWrapper data={item} onClick={() => {
              router.push(item?.ctaUrl);
            }} />
          </div>)
        }
      </div>
      <div className="border-t border-surface-200 py-2">
        <AlertInfo {...alert} />
      </div>
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
  const clearStates = () =>{
    // console.log("clean")
    setItems(false);
    setSubItems(false)
    setItemList({});
    setSubItemList({});

  }

  const [open, setOpen] = useState(false)
  const [openContent, setOpenContent] = useState('')
  const handleHamburguer = () => {
    if (open) {
      setOpen(false)
    }
    else {
      setOpen(true)
    }
  }

  useEffect(()=>{
    // console.log("subitems: ",subItems)
    if(!subItems){
       setSubItemList({})
       setSubItemSelected(false)
    }
  },[subItems])
  useEffect( ()=>{
    // console.log("items: ",items)
    if(!items){
      setSubItems(false)
      setSubItemList({})
      setSubItemSelected(false)
    }
  },[items])

  return (
    // todo desktop sticky
    <div className="absolute desktop:fixed top-0 z-20 flex flex-col w-full tablet:fixed mobile:fixed bg-surface-0 ">
      {/* Primer nivel del menú 
        TODO:
        tablet 
        */}
      <NavigationMenu.Root className="relative flex h-auto desktop:py-4 py-3 desktop:px-21 px-6 desktop:border-b desktop:border-surface-300 w-full justify-center align-middle bg-surface-0">
        <button className="absolute top-0 left-6 pr-3 py-3 desktop:hidden flex items-center h-full" onClick={() => handleHamburguer()}>
          {!open && <Icon name="sort" className="w-7.5 h-7.5" />}
          {open && <span className="flex align-middle items-center"><span className="mr-1 material-symbols-outlined">close</span> <p className="font-texts font-normal text-sm">Cerrar</p></span>}
        </button>
        <div className="w-full max-w-[1200px] flex desktop:justify-between justify-center">
          <div className="h-[45px] w-[104px] desktop:w-36 desktop:h-10 bg-logo bg-cover bg-center "></div>
          <div className="hidden desktop:flex items-center space-x-11">
            <Links links={links} />
            <button
              onClick={() => { button?.CTA ? router.push(button?.CTA) : null }}
              className="px-4 py-3 rounded bg-surface-950 border border-surface-950 text-sm text-surface-100 font-texts hover:bg-surface-50 hover:text-surface-950 text-nowrap">
              {button?.label}
            </button>
          </div>
        </div>
      </NavigationMenu.Root>

      {/* Segundo nivel del menú 
       TODO 
       MANEJO DE ERRORES 
      
      */}
      <div className={classNames(" desktop:flex w-full desktop:min-w-[1024px] h-full bg-surface-0 mobile:px-0 tablet:px-0  desktop:px-21 desktop:justify-center desktop:border-b desktop:border-surface-300 desktop:shadow tablet:fixed mobile:fixed tablet:top-[69px] mobile:top-[69px] tablet:overscroll-none mobile:overscroll-none  ", { ["mobile:-translate-x-full "]: !open, [" tablet:transition-colors tablet:duration-1000 tablet:bg-surface-950/30 tablet:ease-in-out"]: open })}>
        <NavigationMenu.Root value={openContent} onValueChange={setOpenContent} className={classNames("desktop:h-9.5 desktop:w-full  desktop:max-w-[1200px] h-screen overscroll-none desktop:flex tablet:data-[state=closed]:hidden tablet:transition-transform mobile:transition-transform tablet:duration-1000 mobile:duration-1000 mobile:ease-in-out", { ["tablet:-translate-x-full mobile:-translate-x-full "]: !open })}>
          <NavigationMenu.List className="mobile:w-full h-screen mobile:overflow-y-auto mobile:overscroll-y-auto desktop:h-fit desktop:w-auto flex flex-col desktop:justify-between  desktop:flex-row desktop:items-start py-3 desktop:py-0 tablet:max-w-100 bg-surface-0 ">
            <div className=" desktop:flex desktop:w-full desktop:max-w-[1200px] ">
              {menu_items?.map((menu_item, i) => (
                <NavigationMenu.Item key={i} onMouseEnter={() => {
                  setItems(false)
                  setSubItems(false)
                }}
                  className="relative px-6 desktop:block desktop:px-0">
                  <NavigationMenu.Trigger className={classNames("group z-20  flex justify-between desktop:justify-normal mobile:border-b tablet:border-b  w-full  items-center desktop:h-9.5 desktop:space-x-4 font-headings desktop:font-normal font-semibold tex border-surface-300  desktop:data-[state=open]:border-b-4 desktop:data-[state=open]:border-primary-500 desktop:data-[state=open]:text-primary-500 desktop:py-3 desktop:data-[state=open]:pb-2 py-4 desktop:px-3 ")}>
                    {menu_item?.items && menu_item?.items?.length > 0 ? menu_item?.label :
                      <Link href={menu_item?.href?menu_item?.href:""} passHref >
                        <p className="desktop:font-normal font-semibold font-headings text-base">{menu_item?.label }</p>
                      </Link>}
                    {menu_item?.items && menu_item?.items?.length > 0 && <div className="desktop:hidden"><span className="material-symbols-outlined text-2xl  text-surface-800 font-bold ml-3 desktop:hidden">chevron_right</span></div>}
                    {menu_item?.items && menu_item?.items?.length > 0 && <CaretDownIcon className="relative hidden desktop:block transition duration-300 ease-out hover:ease-in group-data-[state=open]:rotate-180 desktop:group-data-[state=open]:text-primary-500 ml-1" aria-hidden />}
                  </NavigationMenu.Trigger>
                  {menu_item?.items && menu_item?.items?.length > 0 && (
                    <NavigationMenu.Content className="mobile:z-20 tablet:max-w-100 desktop:min-h-[440px] desktop:max-h-[724px] mobile:bg-surface-0 bg-surface-50 tablet:min-h-screen mobile:min-h-screen mobile:h-full mobile:overflow-y-auto mobile:overscroll-y-auto">
                      <div tabIndex={-1} onClick={() => setOpenContent('closed')} className={classNames("fixed top-0 w-full h-full mobile:hidden bg-surface-950/30 -z-20 tablet:-z-10 overscroll-none overflow-y-hidden")}></div>
                      <div tabIndex={-1} onMouseLeave={() => {
                        setOpenContent('closed')
                        clearStates()
                      }
                      } className=" bg-surface-0 h-full desktop:min-h-[440px] desktop:max-h-[724px] desktop:px-21 px-6 desktop:py-6 py-3 w-full tablet:max-w-100 flex desktop:flex-row flex-col desktop:justify-center tablet:z-20 mobile:overflow-y-auto mobile:overscroll-y-auto">
                        <div className="flex w-full desktop:max-w-[1200px] desktop:min-h-fit mobile:h-full tablet:h-full mobile:flex-col tablet:flex-col ">
                          <div className="">
                            <div className="desktop:hidden flex flex-col border-b border-surface-300 mobile:mb-3 tablet:mb-3">
                              <div className="flex py-2 space-x-2 align-middle items-center">
                                <button onClick={() => setOpenContent('closed')} ><span className="material-symbols-outlined text-2xl rounded p-2 bg-surface-300 font-bold">arrow_back</span></button>
                                <p className="font-semibold font-texts text-lg">{menu_item?.label}</p>
                              </div>
                              <Link href={menu_item?.href ?? ""} passHref >
                                <div className="py-2 w-full font-texts text-primary-500 font-normal desktop:px-3 flex align-middle">
                                  <p className={classNames("font-normal hover:underline")}>
                                    {menu_item?.linkText ? menu_item?.linkText + '»' : null} </p>
                                </div>
                              </Link>
                            </div>
                            <div tabIndex={-1} onMouseLeave={() => {
                                setSubItems(false)
                            }
                              } className="flex overflow-y-auto overscroll-auto h-full">
                              <SubItems list={menu_item?.items} linkText={menu_item?.linkText} linkHref={menu_item?.href} />
                            </div>
                          </div>
                          <div className="px-6 h-full flex w-full mobile:hidden tablet:hidden" >
                            {(items && itemList?.items && itemList?.items.length < 11) &&
                              <div className="flex space-x-6">
                                <SubItems list={itemList?.items} isSub={true} linkText={menu_item?.linkText} />
                                {subItems && <SubItemsCols subitems={subItemList} isSub linkText={subItemList?.linkText} linkHref={subItemList?.href} />
                                }
                              </div>
                            }
                            {(items && itemList?.items && itemList?.items.length > 10) && <SubItemsCols subitems={itemList} linkText={itemList?.linkText} linkHref={itemList?.href} />}
                            {!items && <LayoutHome banners={banners} alert={alert} />}
                          </div>

                          <div className="desktop:hidden py-6 flex flex-col w-full tablet:max-w-100 mb-100">
                            <button
                              onClick={() => { button?.CTA ? router.push(button?.CTA) : null }}
                              className="px-4 py-3 rounded bg-surface-950 border border-surface-950 text-sm text-surface-100 font-texts hover:bg-surface-50 hover:text-surface-950 w-full">
                              {button?.label}
                            </button>
                            <div className="desktop:hidden py-6 flex mx-auto w-full">
                              <Links links={links} />
                            </div>
                          </div>
                        </div>
                        {items && <div className="desktop:hidden flex flex-col absolute top-0 w-full bg-surface-0 overflow-y-auto overscroll-auto h-full left-full  transition-transform ease-in duration-700 -translate-x-full z-30 ">
                          <SubItems list={itemList?.items} isSub linkText={itemList?.linkText} linkHref={itemList?.href} label={itemList?.label} />
                        </div>}
                        {subItems && <div className="desktop:hidden flex flex-col absolute top-0 w-full bg-surface-0 overflow-y-auto overscroll-auto h-full left-full  transition-transform ease-in duration-700 -translate-x-full z-30 ">
                          <SubItems list={subItemList?.items} isSub linkText={subItemList?.linkText} linkHref={subItemList?.href} label={subItemList?.label} />
                        </div>}

                      </div>
                    </NavigationMenu.Content>
                  )}
                </NavigationMenu.Item>
              ))}
            </div>
            <div className="desktop:hidden p-6 flex flex-col w-full tablet:max-w-100  ">
              <button
                onClick={() => { button?.CTA ? router.push(button?.CTA) : null }}
                className="px-4 py-3 rounded bg-surface-950 border border-surface-950 text-sm text-surface-100 font-texts hover:bg-surface-50 hover:text-surface-950 w-full">
                {button?.label}
              </button>
              <div className="desktop:hidden py-6 flex mx-auto w-full">
                <Links links={links} />
              </div>
            </div>


          </NavigationMenu.List>
          {/* si borran este ya no se ve el contenido a w-full */}
          <div className="absolute w-full desktop:-z-10 desktop:overflow-y-hidden desktop:top-[113px] desktop:left-0 top-0 left-full mobile:transition-transform mobile:ease-in-out mobile:duration-2000 mobile:-translate-x-full tablet:transition-transform tablet:ease-in-out tablet:duration-2000 tablet:-translate-x-full">
            <NavigationMenu.Viewport className="relative w-full desktop:data-[state=open]:min-h-[440px] desktop:data-[state=open]:max-h-[724px] bg-surface-0 overflow-hidden tablet:max-w-100 tablet:min-h-full" />
          </div>
        </NavigationMenu.Root>
      </div>

    </div>
  );
};

export default Header;