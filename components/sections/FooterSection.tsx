import { FC, Fragment } from "react"
import Link from "next/link"
import cn from "classnames"
import Image from "@/old-components/Image"
import Icon from "@/old-components/Icon"
import LinkContactTarget from "@/old-components/LinkContactTarget"
import FooterLogo from "@/components/sections/footer/logo"
import { FooterColumnItem, FooterGroup, FooterSection as Footersection } from "@/utils/getFooters"

interface FooterSect extends  Footersection {
  onClickLogo: ( ()=> void ) | undefined
}

const FooterSection: FC<FooterSect> = ({
  title,
  columns,
  images,
  links,
  logo,
  position,
  social_medias,
  phone,
  onClickLogo
}: FooterSect ) => {
  
  return (

    <section className="flex">
      {/* Section logotype */}
      {
        ( logo || social_medias.data.length > 0 ) && <div className="w-full p-6 border-b  border-0 border-solid border-surface-300">
        {/* logo */}
        {
          logo && <FooterLogo position={position} onClickLogo={onClickLogo}></FooterLogo>
        }
        <div className="flex justify-between w-full">
          {/* social media */}
          <div className="flex w-p:flex-wrap gap-9 items-center">
            {
              social_medias.data && social_medias.data.map((item: any, i: number) => <Link key={`social-${i}`} href={item.attributes.href} passHref target={"_blank"}>

                <Icon name={item.attributes.icon_name} className="w-8 h-8 text-surface-500 w-p:text-balck" />
              </Link>)
            }
            {
              phone &&
              <div className="flex items-center gap-1">
                <Icon name={phone.icon_name} className="w-3 h-3" />
                <LinkContactTarget type="tel" info={`${phone.phone}`}/>
              </div>
            }
          </div>
        </div>
      </div>
      }
      {/* columns */}
      {
        columns.length > 0 && <div className="w-full p-6 w-t:hidden w-p:hidden flex gap-24 border-b  border-0 border-solid border-surface-300">
        {
          columns?.map((column: any, i: number) => <div key={`footer-column-${i}`} className="flex flex-col gap-6 w-64">
            {
              column.groups.map((group: FooterGroup, i: number) => { 
                return <section key={`column-group-${i}`} className="flex flex-col gap-6">
                    {
                      !!group?.href
                        ? <Link href={group.href} passHref target={`_${group.target}`}><p className="font-headings font-bold">{group.title}</p></Link>
                        : <p className="font-headings font-bold">{group.title}</p>
                    }
                    {
                      group?.items?.map((item: FooterColumnItem, j: number) => {
                        return (
                          <Fragment key={`column-link-${j}`}>
                            {
                              !!item?.href
                                ? <Link href={item.href} passHref target={`_${item.target}`}><p className={cn({ "font-headings font-bold": item?.bold, "font-texts font-normal": !item?.bold })}>{item?.label}</p></Link>
                                : <p className={cn({ "font-headings font-bold": item.bold, "font-texts font-normal": !item.bold})}>{item.label}</p>
                            }
                          </Fragment>
                        );
                      })
                    }
              
                </section>
              })
            }
          </div>)
        }
      </div>
      }
      
      {/* certificaciones */}
      {
        images.data.length > 0 && <div className="w-full p-6 flex flex-col border-b  border-0 border-solid border-surface-300">
        <p className="mb-5">{ title }</p>
        <div className="flex gap-12 flex-wrap">
          {
            images?.data?.map(({ attributes: {url, alternativeText} }: any, i: number) => <Image key={`certification-${i}`} classNamesImg="!w-auto !h-12 !relative" src={url} alt={alternativeText} />)
          }
        </div>
      </div>
      }
      {/* link */}
      {
        links.length > 0 && <div className="w-full p-6 w-t:p-2 w-p:p-4 flex justify-center">
          {
            links.map((link, i) => {
              return <>
                <Link key={`link-${i}`} href={link.href} passHref target={link.target}>
                  <p className="font-texts font-normal italic text-sm leading-4 text-surface-800 ">{link.text}</p>
                </Link>
              </>
            })
          }
        </div>
      }
    </section>
  );
}

export default FooterSection