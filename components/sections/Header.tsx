import cn from "classnames";
import Button from "@/old-components/Button/Button";
import { MenuType } from "@/utils/strapi/sections/Header";
import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';

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

  const Link = (label: string) => {
    return (
      <NavigationMenu.Item className="font-headings font-normal text-xs text-surface-400 border-r border-surface-300 px-3">
        {label}
      </NavigationMenu.Item>
    )
  }

  return (
    <div className="absolute top-0 z-20 flex flex-col w-full ">
      <NavigationMenu.Root className="flex py-4 px-21  border-b border-surface-300 w-full justify-between">
        <div className="w-18 h-10 bg-logo bg-cover bg-center "></div>
        <NavigationMenu.List className="flex w-full items-center justify-end">
          {Link("Alumnos")}
          <NavigationMenu.Item className="pl-8">
            <button className="px-4 py-3 rounded bg-surface-950 border border-surface-950 text-sm text-surface-100 font-texts hover:bg-surface-50 hover:text-surface-950">
              Pedir información
            </button>
          </NavigationMenu.Item>
        </NavigationMenu.List>

      </NavigationMenu.Root>
      <NavigationMenu.Root className="h-11 border-b border-surface-300 shadow">
        <NavigationMenu.List className="flex px-21  w-full items-center ">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="group flex space-x-4 font-headings font-semibold text-surface-900 items-center text-sm border-surface-300 px-3 data-[state=open]:border-b-4 data-[state=open]:border-primary-300 data-[state=open]:text-primary-300 py-3">
              Overview <CaretDownIcon className="relative transition duration-150 ease-out hover:ease-in group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-300 ml-1" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="h-full bg-transparent shadow-none ">
              <div className="w-full h-[1000px] bg-surface-950/30 absolute -z-20 blur-md my-20 overscroll-none overflow-y-hidden "></div>
              <div className="bg-surface-0 overflow-y-hidden px-21 py-6" >
                <div className="flex pr-4 border-r border-surface-400 w-fit h-fit ">
                <ul className="flex-col space-y-3">
                  <ListItem title="Introduction" href="/primitives/docs/overview/introduction" >
                  </ListItem>
                  <div className="group hover:border hover:border-surface-400 rounded  py-2 hover:text-primary-500 ">
                    <ListItem href="/primitives/docs/overview/getting-started" >
                    <span className="flex items-center  ">
                      <span className="group-hover:underline font-normal group-hover:text-primary-500">

                    A quick tutorial to get you up and running with Radix Primitives.
                      </span>
                  <span className="font-icons-solid text-lg group-hover:text-primary-500 text-surface-400 font-bold ml-3 ">arrow_forward_ios</span>
                    </span>
                  </ListItem>
                  </div>
                  
                  <ListItem href="/primitives/docs/guides/styling">
                    Unstyled and compatible with any styling solution.
                  </ListItem>
                  <ListItem  href="/primitives/docs/guides/animation">
                    Use CSS keyframes or any animation library of your choice.
                  </ListItem>
                  <ListItem  href="/primitives/docs/overview/accessibility">
                    Tested in a range of browsers and assistive technologies.
                  </ListItem>
                  <ListItem  href="/primitives/docs/overview/releases">
                    Radix Primitives releases and their changelogs.
                  </ListItem>
                </ul>
              </div>
              </div>
              
            </NavigationMenu.Content>
          </NavigationMenu.Item>



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

const ListItem = ({ className, children, title, ...props }: any) => (
  <li className="px-3">
    <NavigationMenu.Link asChild>
      <a >
        <div className="font-heading text-surface-950 font-semibold">{title}</div>
        <p className="font-texts text-surface-400 pl-2 font-normal">{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
);


export default Header;