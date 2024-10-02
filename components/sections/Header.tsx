import { MenuType, SubitemsType } from "@/utils/strapi/sections/Header";
import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import Link from "next/link";
import { useRouter } from "next/router";
import RepeatableBannerSection from "./RepeatableBannerSection";
import AlertInfo from "./AlertInfo";
import classNames from "classnames";
import BannerPortalverseWrapper from "../BannerPortalverseWrapper";
import { BannerData } from "@/utils/strapi/sections/Banner";

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
    <NavigationMenu.List className="flex w-full items-center justify-end last:border-none">
      {links?.map((link?: any, i?: number) => (
        <NavigationMenu.Item key={i} className="px-3 border-r border-surface-300">
          <Link href={link?.href ?? ""} passHref>
            <p className="font-headings font-normal text-xs text-surface-400 cursor-pointer hover:underline">
              {link?.text}
            </p>
          </Link>
        </NavigationMenu.Item>
      ))}
    </NavigationMenu.List>
  );

  // Componente de subitems
  const SubItems = ({ subitems, isSub = false, linkText }: { subitems: SubitemsType[], isSub?: boolean, linkText?: string }) => (
    <div className="w-75 border-r border-surface-200">
      <ul className={classNames("flex-col w-full h-full pr-6", { ["w-70"]: isSub })} tabIndex={-1} onMouseEnter={() => { isSub ? setSubItems(true) : setItems(true) }} >
        {subitems.map((item: any, i: number) =>
          item?.items?.length > 0 ? (
            <button key={i} className="group hover:border hover:border-surface-200 rounded hover:text-primary-500 px-3 py-2 w-full"
              onMouseEnter={() => handleMouseEnter(item.items, isSub)}>
              <Link href={item.href ?? ""} passHref>
                <div className="flex items-center justify-between">
                  <p className="group-hover:underline font-normal group-hover:text-primary-500 text-surface-500 font-texts text-wrap text-left">
                    {item.label}
                  </p>
                  <span className="material-symbols-outlined text-2xl group-hover:text-primary-500 text-surface-400 font-bold ml-3">chevron_right</span>
                </div>
              </Link>
            </button>
          ) : (
            <Link key={i} href={item.href ?? ""} passHref onMouseEnter={() => { isSub ? setSubItems(false) : setItems(false) }}>
              <p className={classNames("py-2 w-full", { ["font-heading text-surface-950 font-semibold"]: item.bold, ["font-texts text-surface-500 hover:text-primary-500 font-normal px-3"]: !item.bold })}>{item.label}</p>
            </Link>
          )
        )}
        <Link href={""} passHref onMouseEnter={() => { isSub ? setSubItems(false) : setItems(false) }}>
          <div className="py-2 w-full font-texts text-primary-500 font-normal px-3 flex align-middle">
            <p className={classNames("font-normal hover:underline")}>
              {linkText}</p><span className="material-symbols-outlined font-normal text-sm">double_arrow</span>
          </div>

        </Link>
      </ul>
    </div>
  );

  const SubItemsCols = ({ subitems, isSub = false, linkText }: { subitems: SubitemsType[]; isSub?: boolean, linkText?: string }) => (
    <div className="flex flex-col">
      <ul className={classNames("flex flex-col flex-wrap max-h-100", { ["w-1/3"]: !isSub, ["w-75"]: isSub })} tabIndex={-1} onMouseEnter={() => setItems(true)}>
        {subitems.map((item, i) => (
          <Link key={i} href={item.href ?? ""} passHref>
            <p className={classNames("font-text text-base mr-3 mb-3",
              {
                ["font-heading text-surface-950 font-semibold"]: item.bold,
                ["font-texts text-surface-400 hover:text-primary-500 pl-2 font-normal text-wrap text-left"]: !item.bold
              })}>
              {item.label}
            </p>
          </Link>
        ))}
      </ul>
      <div className="w-full border-t border-surface-200 ">
        <div className="py-2 w-full font-texts text-primary-500 font-normal px-3 flex align-middle">
          <p className={classNames("font-normal hocer:underline")}>
            {linkText}</p><span className="material-symbols-outlined font-normal text-sm">double_arrow</span>
        </div>
      </div></div>
  );

  // Layout para la página de inicio
  const LayoutHome = ({ banners, alert }: { banners: any, alert: any }) => (
    <div className="flex flex-col space-y-3 w-full justify-between h-full">
      <div className="grid w-d:grid-cols-2 gap-6 w-t:grid-cols-1 w-p:grid-cols-1">
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

  return (
    <div className="absolute top-0 z-20 flex flex-col w-full">
      {/* Primer nivel del menú */}
      <NavigationMenu.Root className="flex py-4 px-21 border-b border-surface-300 w-full justify-between">
        <div className="w-36 h-10 bg-logo bg-cover bg-center"></div>
        <div className="flex items-center">
          <Links links={links} />
          <button
            onClick={() => { button?.CTA ? router.push(button?.CTA) : null }}
            className="px-4 py-3 rounded bg-surface-950 border border-surface-950 text-sm text-surface-100 font-texts hover:bg-surface-50 hover:text-surface-950">
            {button?.label}
          </button>
        </div>
      </NavigationMenu.Root>

      {/* Segundo nivel del menú */}
      <NavigationMenu.Root className="h-9.5 border-b border-surface-300 shadow">
        <NavigationMenu.List className="px-21 w-full flex items-center">
          {menu_items?.map((menu_item, i) => (
            <NavigationMenu.Item key={i}onMouseEnter={()=>{
              setItems(false)
              setSubItems(false)
              }}>
              <NavigationMenu.Trigger className="group flex h-9.5 space-x-4 font-headings font-normal text-surface-900 items-center text-sm border-surface-300 px-3 data-[state=open]:border-b-4 data-[state=open]:border-primary-300 data-[state=open]:text-primary-300 py-3">
                {menu_item.label} <CaretDownIcon className="relative transition duration-150 ease-out hover:ease-in group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-300 ml-1" aria-hidden />
              </NavigationMenu.Trigger>
              {menu_item.items && (
                <NavigationMenu.Content className="h-full bg-transparent shadow-none w-full">
                  <div className="w-full h-[1000px] bg-surface-950/30 absolute -z-20 blur-md my-20 overscroll-none overflow-y-hidden"></div>
                  <div className="bg-surface-50 h-full max-h-[600px] px-21 py-6 w-full flex justify-center">
                    <div className="flex w-full max-w-[1200px] min-h-fit">
                      <SubItems subitems={menu_item.items} linkText={menu_item.linkText} />
                      <div className="w-3/4 px-6 h-full flex">
                        {(items && itemList.length < 11) &&
                          <div className="flex space-x-6">
                            <SubItems subitems={itemList} isSub={true} linkText={menu_item.linkText} />
                            {subItems && <SubItemsCols subitems={subItemList} isSub linkText={menu_item.linkText} />
                            }
                          </div>
                        }
                        {(items && itemList.length > 10) && <SubItemsCols subitems={itemList} linkText={menu_item.linkText} />}
                        {!items && <LayoutHome banners={banners} alert={alert} />}
                      </div>
                    </div>
                  </div>
                </NavigationMenu.Content>
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>
    </div>
  );
};

export default Header;
