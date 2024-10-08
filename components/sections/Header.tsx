import { MenuType, SubitemsType } from "@/utils/strapi/sections/Header";
import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import Link from "next/link";
import { useRouter } from "next/router";
import AlertInfo from "./AlertInfo";
import classNames from "classnames";
import BannerPortalverseWrapper from "../BannerPortalverseWrapper";
import Icon from "@/old-components/Icon"

// Componente principal Header
const Header = (props: MenuType) => {
  const { name, links, button, menu_items, banners, alert } = props;
  const router = useRouter();

  const [items, setItems] = useState(false);
  const [subItems, setSubItems] = useState(false);
  const [itemList, setItemList] = useState<SubitemsType[]>([]);
  const [subItemList, setSubItemList] = useState<SubitemsType[]>([]);

  // Componente de enlaces
  const Links = ({ links }: { links?: (MenuType['links']) }) => (
    <div className="w-full">
      <NavigationMenu.List className="flex mobile:space-x-3 w-full desktop:items-center desktop:justify-end desktop:last:border-none">
        {links?.map((link?: any, i?: number) => (
          <NavigationMenu.Item key={i} className="mobile:w-1/2 desktop:px-3 mobile:p-4 desktop:border-r mobile:border-2 mobile:rounded-lg desktop:border-surface-300">
            <Link href={link?.href ?? ""} passHref>
              <p className="font-headings font-normal mobile:font-semibold text-xs desktop:text-surface-400 cursor-pointer hover:underline w-full">
                {link?.text}
              </p>
              <span className=" material-symbols-outlined desktop:!hidden  mobile:inline-block mobile:text-2xl mobile:font-bold mobile:text-end mobile:w-full">arrow_forward</span>
            </Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </div>

  );

  // Componente de subitems
  const SubItems = ({ subitems, isSub = false, linkText, linkHref = '' }: { subitems: SubitemsType[], isSub?: boolean, linkText?: string, linkHref?: string }) => (
    <div className="max-w-[692px] tablet:w-full mobile:w-full mobile:border-none border-r border-surface-200 ">
      <ul className={classNames("flex-col w-full h-full pr-6 mobile:pr-0", { ["w-70"]: isSub })} tabIndex={-1} onMouseEnter={() => { isSub ? setSubItems(true) : setItems(true) }} >
        {subitems.map((item: any, i: number) =>
          item?.items?.length > 0 ? (
            <button key={i} className="group hover:border hover:border-surface-200 rounded hover:text-primary-500 px-3 py-2 w-full"
              onMouseEnter={() => handleMouseEnter(item.items, isSub)}>
              <div className="flex items-center justify-between">
                <p className={classNames("group-hover:underline font-normal mobile:font-semibold group-hover:text-primary-500 text-surface-500 font-texts text-wrap text-left text-base", { ["text-sm"]: isSub })}>
                  {item.label}
                </p>
                <span className="material-symbols-outlined text-2xl group-hover:text-primary-500 text-surface-400 font-bold ml-3">chevron_right</span>
              </div>
            </button>
          ) : (
            <Link key={i} href={item.href ?? ""} passHref onMouseEnter={() => { isSub ? setSubItems(false) : setItems(false) }}>
              <p className={classNames("py-2 w-full ", { ["font-heading text-surface-950 font-semibold"]: item.bold, ["font-texts text-surface-500 hover:text-primary-500 font-normal px-3"]: !item.bold, ["text-sm"]: isSub })}>{item.label}</p>
            </Link>
          )
        )}
        <Link href={linkHref} passHref onMouseEnter={() => { isSub ? setSubItems(false) : setItems(false) }} className="mobile:hidden">
          <div className="py-2 w-full font-texts text-primary-500 font-normal px-3 flex align-middle">
            <p className={classNames("font-normal hover:underline", { ["text-sm"]: isSub })}>
              {linkText} »</p>
          </div>
        </Link>
      </ul>
    </div>
  );

  const SubItemsCols = ({ subitems, isSub = false, linkText, linkHref = "" }: { subitems: SubitemsType[]; isSub?: boolean, linkText?: string, linkHref?: string }) => (
    <div className="flex flex-col w-full">
      <ul className={classNames("flex flex-col flex-wrap max-h-100 max-w-75")} tabIndex={-1} onMouseEnter={() => setItems(true)}>
        {subitems.map((item, i) => (
          <Link key={i} href={item.href ?? ""} passHref>
            <p className={classNames("font-text text-sm mr-3 mb-3",
              {
                ["font-heading text-surface-950 font-semibold"]: item.bold,
                ["font-texts text-surface-400 hover:text-primary-500 font-normal text-wrap text-left"]: !item.bold,
              })}>
              {item.label}
            </p>
          </Link>
        ))}
      </ul>
      <div className="w-full border-t border-surface-200 ">
        <div className="py-2 w-full font-texts text-primary-500 font-normal flex align-middle">
          <Link href={linkHref} passHref>
            <p className={classNames("font-normal hover:underline text-sm")}>
              {linkText} »</p></Link>

        </div>
      </div>
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

  const handleMouseEnter = (list: SubitemsType[], isSub: boolean) => {
    if (!isSub) {
      setItems(true);
      setItemList(list);
    } else {
      setSubItemList(list);
      setSubItems(true)
    }
  };

  const [open, setOpen] = useState(false)
  const handleHamburguer = () => {
    if (open) {
      setOpen(false)
    }
    else {
      setOpen(true)
    }
  }

  const [itemsBack, setItemsBack] = useState([{}]);
  const [isback, setisBack] = useState(false);
  const handleBack = (isSub: boolean, items?: any) => {
    if (isSub) {
      setItemsBack(itemList)
      setItemList(items)
    }
    else{
      setisBack(true)
    }
  }

  return (
    <div className="absolute top-0 z-20 flex flex-col w-full ">
      {/* Primer nivel del menú */}
      <NavigationMenu.Root className="relative flex mobile:h-fit desktop:py-4 tablet:py-1 mobile:py-3 desktop:px-21 tablet:px-21 mobile:px-3 desktop:border-b desktop:border-surface-300 w-full desktop:justify-between tablet:justify-between mobile:justify-center mobile:align-middle ">
        <button className="absolute top-0 left-0 px-3 py-3 hidden mobile:flex items-center h-full" onClick={() => handleHamburguer()}>
          {!open && <Icon name="sort" className="w-6 h-6" />}
          {open && <span className="flex align-middle items-center"><Icon name="close" className="w-3 h-3 mr-1" /> <p className="font-texts font-normal text-sm">Cerrar</p></span>}
        </button>
        <div className="w-36 h-10 bg-logo bg-cover bg-center mobile:h-6 mobile:w-24"></div>
        <div className="flex items-center mobile:hidden">
          <Links links={links} />
          <button
            onClick={() => { button?.CTA ? router.push(button?.CTA) : null }}
            className="px-4 py-3 rounded bg-surface-950 border border-surface-950 text-sm text-surface-100 font-texts hover:bg-surface-50 hover:text-surface-950 text-nowrap">
            {button?.label}
          </button>
        </div>
      </NavigationMenu.Root>
      {/* Segundo nivel del menú */}
      <NavigationMenu.Root className={classNames("desktop:h-9.5 mobile:h-screen tablet:h-auto desktop:border-b desktop:border-surface-300 desktop:shadow mobile:bg-surface-50 mobile:overscroll-none", { ["mobile:hidden"]: !open })}>
        <NavigationMenu.List className="desktop:px-21 desktop:w-full flex mobile:flex-col desktop:items-center mobile:py-4">
          {menu_items?.map((menu_item, i) => (
            <NavigationMenu.Item key={i} onMouseEnter={() => {
              setItems(false)
              setSubItems(false)
            }}
              className="mobile:relative mobile:px-6">
              <NavigationMenu.Trigger
                className="group flex mobile:justify-between mobile:border-b mobile:w-full items-center h-9.5 desktop:space-x-4 font-headings font-normal mobile:font-semibold text-surface-900 text-sm border-surface-300 desktop:data-[state=open]:border-b-4 desktop:data-[state=open]:border-primary-300 desktop:data-[state=open]:text-primary-300 py-3 mobile:py-4 desktop:px-3 ">
                {menu_item.label}
                <span className="material-symbols-outlined text-2xl  text-surface-800 font-bold ml-3 desktop:hidden">chevron_right</span>
                <CaretDownIcon className="relative mobile:hidden transition duration-150 ease-out hover:ease-in group-data-[state=open]:rotate-180 desktop:group-data-[state=open]:text-primary-300 ml-1" aria-hidden />
              </NavigationMenu.Trigger>
              {menu_item.items && (
                <NavigationMenu.Content aria-hidden={isback? "true":"false"} className={classNames("h-full bg-transparent shadow-none w-full mobile:absolute mobile:top-12 mobile:left-full mobile:transition-transform mobile:ease-in mobile:duration-700 mobile:-translate-x-full")}>
                  <div className="w-full h-[1000px] mobile:h-fit bg-surface-950/30 absolute -z-20 blur-md my-20 overscroll-none overflow-y-hidden mobile:hidden "></div>
                  <div className="bg-surface-50 h-full max-h-[600px] px-21 mobile:px-3 py-6 mobile:py-3 w-full flex mobile:flex-col desktop:justify-center">
                    <div className="flex w-full max-w-[1200px] min-h-fit mobile:flex-col">
                      <div className="hidden mobile:flex flex-col border-b border-surface-300">
                        <div className="flex py-2 space-x-2 align-middle items-center">
                          <button onClick={()=>handleBack(false)}><span className="material-symbols-outlined text-2xl rounded p-2 bg-surface-300 font-bold ml-3">arrow_back</span></button>
                          <p className="font-semibold font-texts text-lg">{menu_item.label}</p>
                        </div>
                        <Link href={menu_item?.href || ""} passHref >
                          <div className="py-2 w-full font-texts text-primary-500 font-normal px-3 flex align-middle">
                            <p className={classNames("font-normal hover:underline")}>
                              {menu_item.linkText} »</p>
                          </div>
                        </Link>
                      </div>
                      {!items && <SubItems subitems={menu_item.items} linkText={menu_item.linkText} />}
                      {subItems && <SubItemsCols subitems={subItemList} />}

                      <div className="px-6 h-full flex w-full mobile:hidden">
                        {(items && itemList.length < 11) &&
                          <div className="flex space-x-6">
                            <SubItems subitems={itemList} isSub={true} linkText={menu_item.linkText} />
                            {subItems && <SubItemsCols subitems={subItemList} isSub linkText={menu_item.linkText} linkHref={menu_item?.href} />
                            }
                          </div>
                        }
                        {(items && itemList.length > 10) && <SubItemsCols subitems={itemList} linkText={menu_item.linkText} linkHref={menu_item?.href} />}
                        {!items && <LayoutHome banners={banners} alert={alert} />}
                      </div>

                    </div>
                    <div className="desktop:hidden py-6 px-2 flex flex-col w-full">
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

                </NavigationMenu.Content>
              )}
            </NavigationMenu.Item>
          ))}
          <div className="desktop:hidden p-6 flex flex-col w-full">
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
        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>
    </div>
  );
};

export default Header;