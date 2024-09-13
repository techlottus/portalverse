import cn from "classnames";
import Button from "@/old-components/Button/Button";
import { MenuType, SubitemsType } from "@/utils/strapi/sections/Header";
import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import Link from "next/link"
import { useRouter } from "next/router";

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
  const data: any = {
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
        "CTA": '/pedir-informacion',
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
        "subitems": []
      },
      {
        "id": "2",
        "label": "Oferta Academica",
        subitems: [
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
                "subitems": []
              },
              {
                "id": "2",
                "label": "Licenciatura en Administración de Empresas",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "1",
                "label": "Licenciatura Ejecutiva en Comercio Internacional",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "4",
                "label": "Licenciatura en Contaduría y Finanzas",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "6",
                "label": "Licenciatura en Mercadotecnia",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "5",
                "label": "Licenciatura en Turismo",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "7",
                "label": "Salud",
                "bold": true,
                "href": null,
                "subitems": []
              },
              {
                "id": "8",
                "label": "Licenciatura en Psicología",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "9",
                "label": "Licenciatura en Nutrición",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "11",
                "label": "Licenciatura en Fisioterapia",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "10",
                "label": "Licenciatura en Cirujano Dentista",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "12",
                "label": "Ingeniería y Tecnologías",
                "bold": true,
                "href": null,
                "subitems": []
              },
              {
                "id": "13",
                "label": "Licenciatura en Ingeniería en Sistemas Computacionales",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "14",
                "label": "Licenciatura Ejecutiva en Comercio Internacional",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "17",
                "label": "Licenciatura en Contaduría y Finanzas",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "16",
                "label": "Licenciatura en Mercadotecnia",
                "bold": false,
                "href": null,
                "subitems": []
              },
              {
                "id": "15",
                "label": "Licenciatura en Turismo",
                "bold": false,
                "href": null,
                "subitems": []
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
          "desktopRatio": "7/2",
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
          "desktopRatio": "7/2",
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

  const Links = () => {
    return (
      <NavigationMenu.List className="flex w-full items-center justify-end last:border-none ">
        {/*TODO map function to list items */}
        {data?.links_button.map((link: any) =>
          <NavigationMenu.Item className=" border-r border-surface-300 px-3 ">
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

  const SubItems = ({subitems}: {subitems:SubitemsType[]}) => {
    return (
      <ul className="flex-col">
        { subitems?.map((item:any,i:number) => 
          item?.items.length > 0 ? 
                <button key={i} className="group hover:border hover:border-surface-400 rounded hover:text-primary-500 px-2 py-2" onMouseEnter={() => setItems(true)} >
                  <Link href={item?.href ? item.href:""} passHref>
                    <div className="flex items-center  ">
                      <p className="group-hover:underline font-normal group-hover:text-primary-500 text-surface-400 font-texts">
                        {item?.label}
                      </p>
                      <span className="font-icons-outlined text-lg group-hover:text-primary-500 text-surface-400 font-bold ml-3 ">arrow_forward_ios</span>
                    </div>
                  </Link>
                </button>
              : item.bold ?
                <Link key={i} href={item?.href ? item.href:""} passHref><p className="font-heading text-surface-950 font-semibold py-2">{item.label}</p></Link>
                :
                <Link key={i} href={item?.href ? item.href:""} passHref><p className="font-texts text-surface-400 pl-2 font-normal py-2">{item.label}</p></Link>
    
          )
        }

      </ul>
    )
  }

  return (
    <div className="absolute top-0 z-20 flex flex-col w-full ">
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
      <NavigationMenu.Root className="h-11 border-b border-surface-300 shadow">
        <NavigationMenu.List className="flex px-21  w-full items-center ">
          {data.menu_items.map((menu_item: any,i:number) =>
            <NavigationMenu.Item key={i}>
              <NavigationMenu.Trigger className="group flex space-x-4 font-headings font-semibold text-surface-900 items-center text-sm border-surface-300 px-3 data-[state=open]:border-b-4 data-[state=open]:border-primary-300 data-[state=open]:text-primary-300 py-3">
                {menu_item.label} <CaretDownIcon className="relative transition duration-150 ease-out hover:ease-in group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-300 ml-1" aria-hidden />
              </NavigationMenu.Trigger>
              {
                menu_item.subitems ?  <NavigationMenu.Content className="h-full bg-transparent shadow-none ">
                  <div className="w-full h-[1000px] bg-surface-950/30 absolute -z-20 blur-md my-20 overscroll-none overflow-y-hidden "></div>
                  <div className="bg-surface-0 overflow-y-hidden px-21 py-6" >
                    <div className="flex">
                      <div className="flex pr-4 border-r border-surface-400 w-fit h-fit ">
                        <SubItems subitems={menu_item?.subitems} />
                      </div>
                      {items &&
                        <div className="px-6" tabIndex={-1} onMouseEnter={() => setItems(true)} onMouseLeave={() => setItems(false)}>
                          {/* <SubItems /> */}
                        </div>
                      }
                    </div>
                  </div>

                </NavigationMenu.Content>:null
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