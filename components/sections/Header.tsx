import cn from "classnames";
import Button from "@/old-components/Button/Button";
import { MenuType, SubitemsType } from "@/utils/strapi/sections/Header";
import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import Link from "next/link"
import { useRouter } from "next/router";
import Banner from "./Banner";
import RepeatableBannerSection from "./RepeatableBannerSection";
import AlertInfo from "./AlertInfo";

const Header = (props: MenuType) => {
  const {
    id,
    show_logo,
    name,
    links_button,
    menu_items,
    banners,
    alert
  } = props;

  const router = useRouter()
  const data: any =  {
    "show_logo": true,
    "name": "header-demo",
    "links_button": [
      {
        "id": "15",
        "text": "Alumnos",
        "target": "blank",
        "href": "/alumnos",
        "iconName": null,
        "iconPosition": "left"
      },
      {
        "id": "16",
        "text": "Egresados",
        "target": "blank",
        "href": "/egresados",
        "iconName": null,
        "iconPosition": "left"
      },
      {
        "label": "Pedir info",
        "CTA": "/pedir-informacion",
        "size": null,
        "id": "24",
        "variant": "primary",
        "iconName": null
      }
    ],
    "menu_items": [
      {
        "id": "1",
        "label": "Admisiones",
        "subitems": [
          {
            "id": "4",
            "label": "Salud",
            "bold": true,
            "href": "/salud",
            "items": []
          },
          {
            "id": "5",
            "label": "Licenciatura en Psicología",
            "bold": false,
            "href": "/licenciatura",
            "items": [
              {
                "id": "20",
                "label": "Licenciatura en Contaduría y Finanzas",
                "bold": true,
                "href": null,
                "items": [
                  {
                    "id": "1",
                    "label": "Licenciatura en Psicología",
                    "href": null,
                    "bold": true
                  },
                  {
                    "id": "2",
                    "label": "Licenciatura en Nutrición",
                    "href": null,
                    "bold": false
                  },
                  {
                    "id": "3",
                    "label": "Licenciatura en Fisioterapia",
                    "href": null,
                    "bold": false
                  }
                ]
              },
              {
                "id": "19",
                "label": "Licenciatura en Cirujano Dentista",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "18",
                "label": "Licenciatura en Derecho",
                "bold": false,
                "href": null,
                "items": []
              }
            ]
          }
        ]
      },
      {
        "id": "2",
        "label": "Oferta Academica",
        "subitems": [
          {
            "id": "2",
            "label": "Nivel Educativo",
            "bold": true,
            "href": null,
            "items": []
          },
          {
            "id": "1",
            "label": "Bachillerato",
            "bold": false,
            "href": null,
            "items": []
          },
          {
            "id": "3",
            "label": "Licenciaturas",
            "bold": false,
            "href": null,
            "items": [
              {
                "id": "3",
                "label": "Negocios y Empresariales",
                "bold": true,
                "href": null,
                "items": []
              },
              {
                "id": "2",
                "label": "Licenciatura en Administración de Empresas",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "1",
                "label": "Licenciatura Ejecutiva en Comercio Internacional",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "4",
                "label": "Licenciatura en Contaduría y Finanzas",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "6",
                "label": "Licenciatura en Mercadotecnia",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "5",
                "label": "Licenciatura en Turismo",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "7",
                "label": "Salud",
                "bold": true,
                "href": null,
                "items": []
              },
              {
                "id": "8",
                "label": "Licenciatura en Psicología",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "9",
                "label": "Licenciatura en Nutrición",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "11",
                "label": "Licenciatura en Fisioterapia",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "10",
                "label": "Licenciatura en Cirujano Dentista",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "12",
                "label": "Ingeniería y Tecnologías",
                "bold": true,
                "href": null,
                "items": []
              },
              {
                "id": "13",
                "label": "Licenciatura en Ingeniería en Sistemas Computacionales",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "14",
                "label": "Licenciatura Ejecutiva en Comercio Internacional",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "17",
                "label": "Licenciatura en Contaduría y Finanzas",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "16",
                "label": "Licenciatura en Mercadotecnia",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "15",
                "label": "Licenciatura en Turismo",
                "bold": false,
                "href": null,
                "items": []
              }
            ]
          }
        ]
      }
    ],
    "banners": {
      "title": null,
      "description": null,
      "banners": [
        {
          "title": "Banner 1",
          "subtitle": "contenido de banner 1",
          "desktopRatio": "2/1",
          "desktopImage": {
            "data": {
              "attributes": {
                "url": "https://bedu-staging-assets.s3.us-west-2.amazonaws.com/ULA/ULA_Desktop_Background_Image_f7aa20c49e.png",
                "alternativeText": null
              }
            }
          },
          "ctaUrl": null,
          "ctaText": null,
          "textPosition": "left_top",
          "overlay": null,
          "contentVariant": "light"
        },
        {
          "title": "Banner 2",
          "subtitle": "contenido de banner 2",
          "desktopRatio": "2/1",
          "desktopImage": {
            "data": {
              "attributes": {
                "url": "https://bedu-staging-assets.s3.us-west-2.amazonaws.com/ULA/ULA_Desktop_Background_Image_f7aa20c49e.png",
                "alternativeText": null
              }
            }
          },
          "ctaUrl": null,
          "ctaText": null,
          "textPosition": "left_top",
          "overlay": null,
          "contentVariant": "light"
        }
      ]
    },
    "alert": {
      "title": "¿Necesitas orientación personalizada?",
      "subtitle": "Resuelve todas tus dudas",
      "image": {
        "data": {
          "attributes": {
            "url": "https://bedu-staging-assets.s3.us-west-2.amazonaws.com/ULA/Icon_a110cef675.svg"
          }
        }
      },
      "link": {
        "text": "Pedir información",
        "target": "blank",
        "iconName": "arrow_forward",
        "iconPosition": "right",
        "href": "/pedir-informacion"
      }
    }
  }
  const [items, setItems] = useState(false)
  const [itemList,setItemList] = useState<any[]>([])

  const Links = () => {
    return (
      <NavigationMenu.List className="flex w-full items-center justify-end last:border-none ">
        {/*TODO map function to list items */}
        {data?.links_button.map((link: any, i: number) =>
          <NavigationMenu.Item key={i} className=" border-r border-surface-300 px-3 ">
            <Link href={link.href ? link.href : ""} passHref >
              <p className="font-headings font-normal text-xs text-surface-400 hover:underline cursor-pointer">
                {link?.text}
              </p>
            </Link>
          </NavigationMenu.Item>
        )}
      </NavigationMenu.List>
    )
  }

  const LayoutHome = () => <div className="flex-col space-y-3 w-full justify-between">
    <RepeatableBannerSection {...data?.banners} />
    <div className="border-t border-surface-400 py-2">
      <AlertInfo {...data?.alert} />
    </div>
  </div>

  const handleMouseEnter = (list:any)=>{
    setItems(true)
    setItemList(list)
  }

  const SubItems = ({ subitems , isSub=false}: { subitems: SubitemsType[] | undefined ,isSub?:boolean}) => {
    return (
      <ul className="flex-col w-full h-full pr-4" tabIndex = {-1} onMouseEnter={()=>setItems(isSub)}>
        {subitems && subitems?.map((item: any, i: number) =>
          item?.items?.length > 0 ?
            <button key={i} className="group hover:border hover:border-surface-400 rounded hover:text-primary-500 px-2 py-2 w-full" onMouseEnter={() => handleMouseEnter(item?.items) } onMouseLeave={()=>setItems(false)}>
              <Link href={item?.href ? item.href : ""} passHref>
                <div className="flex items-center justify-between ">
                  <p className="group-hover:underline font-normal group-hover:text-primary-500 text-surface-400 font-texts">
                    {item?.label}
                  </p>
                  <span className="material-symbols-outlined  text-lg group-hover:text-primary-500 text-surface-400 font-bold ml-3 ">arrow_forward_ios</span>
                </div>
              </Link>
            </button >
            : item.bold ?
              <Link key={i} href={item?.href ? item.href : ""} passHref><p className="font-heading text-surface-950 font-semibold py-2 w-full" onMouseEnter={() => setItems(false) } >{item.label}</p></Link>
              :
              <Link key={i} href={item?.href ? item.href : ""} passHref><p className="font-texts text-surface-400 pl-2 font-normal py-2 w-full" onMouseEnter={() => setItems(false) }>{item.label}</p></Link>
        )}
      </ul>
    )
  }
  const SubItemsCols = ({ subitems }: { subitems: SubitemsType[] | undefined }) => {
    return (
      <ul className="grid grid-rows-10 grid-flow-col gap-1 pr-4 w-280" tabIndex={-1} onMouseEnter={()=>setItems(true)} onMouseLeave={()=>setItems(false)}>
        {subitems && subitems?.map((item: any, i: number) =>
         item.bold ?
              <Link key={i} href={item?.href ? item.href : ""} passHref><p className="font-heading text-surface-950 font-semibold">{item.label}</p></Link>
              :
              <Link key={i} href={item?.href ? item.href : ""} passHref><p className="font-texts text-surface-400 pl-2 font-normal ">{item.label}</p></Link>
        )}
      </ul>
    )
  }

  return (
    <div className="absolute top-0 z-20 flex flex-col w-full ">
      {/* Primer nivel del menú */}
      <NavigationMenu.Root className="flex py-4 px-21  border-b border-surface-300 w-full justify-between">
        <div className="w-18 h-10 bg-logo bg-cover bg-center "></div>
        <div className="flex items-center">
          <Links />
          <button
            onClick={() => {
              if (data?.links_button[2].CTA) {
                router?.push(data.links_button[-1].CTA);
              }
            }}
            className="px-4 py-3 rounded bg-surface-950 border border-surface-950 text-sm text-surface-100 font-texts hover:bg-surface-50 hover:text-surface-950">
            {data?.links_button[2]?.label}
          </button>
        </div>
      </NavigationMenu.Root>
      {/* Segundo Nivel delMenu */}
      <NavigationMenu.Root className="h-11 border-b border-surface-300 shadow">
        <NavigationMenu.List className="flex px-21  w-full items-center ">
          {data.menu_items.map((menu_item: any, i: number) =>
            <NavigationMenu.Item key={i}>
              <NavigationMenu.Trigger className="group flex space-x-4 font-headings font-semibold text-surface-900 items-center text-sm border-surface-300 px-3 data-[state=open]:border-b-4 data-[state=open]:border-primary-300 data-[state=open]:text-primary-300 py-3">
                {menu_item.label} <CaretDownIcon className="relative transition duration-150 ease-out hover:ease-in group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-300 ml-1" aria-hidden />
              </NavigationMenu.Trigger>
              {
                menu_item.subitems ?
                  <NavigationMenu.Content className="h-full bg-transparent shadow-none">
                    <div className="w-full h-[1000px] bg-surface-950/30 absolute -z-20 blur-md my-20 overscroll-none overflow-y-hidden "></div>
                    <div className="bg-surface-0 max-h-[1000px] px-21 py-6 h-full w-full" >
                      {/* items and subitems */}
                      <div className="flex w-full">
                        <div className="w-1/4 border-r border-surface-400">
                          <SubItems subitems={menu_item?.subitems} />
                        </div>
                        <div className="w-3/4 px-3" >
                          {(items && itemList.length < 11) && <SubItems subitems={itemList} isSub/>}
                          {(items && itemList.length > 10) && <SubItemsCols subitems={itemList}/>}
                          {!items && <LayoutHome/>}
                        </div>

                      </div>


                      {/* <div className="flex h-full ">
                        <SubItems subitems={menu_item?.subitems} />  {
                          !items ?
                            <div className="flex-col space-y-3 w-3/4 justify-between">
                               <RepeatableBannerSection {...data?.banners} />
                               <div className="border-t border-surface-400 py-2">
                               <AlertInfo {...data?.alert}/> 
                               </div>
                            </div>
                            : null
                        }                      
                      </div> */}

                    </div>
                  </NavigationMenu.Content> : null
              }
            </NavigationMenu.Item>
          )}

          <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>
    </div>
  );
};



export default Header;