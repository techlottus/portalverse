import { FC, Fragment, useEffect, useState } from "react"
import Link from "next/link"
import cn from "classnames"
import Image from "@/old-components/Image"
import Icon from "@/old-components/Icon"
import LinkContactTarget from "@/old-components/LinkContactTarget"
import FooterPortalverseComponentData from "@/types/FooterPortalverse.types"

const Footer: FC<FooterPortalverseComponentData> = ({ privacyLink, certifications, logotype, social, phone, directorio, sections, onClickLogo }: FooterPortalverseComponentData) => {

  const [ year, setYear ] = useState<string>("0");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <section className="w-full border-t border-solid border-surface-800 mt-18 w-t:mt-12 w-p:mt-12">
      {/* Section logotype */}
      <div className="p-6 w-p:hidden border-b-[1px] border-solid border-surface-300">
        <div className="flex justify-between items-center mb-6 cursor-pointer" onClick={onClickLogo}>
          <div className="w-36 h-10 bg-logo bg-cover bg-center"> </div>
          <div className="hidden">
            <p>Suscríbete a nuestro newsletter</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-9 items-center">
            {
              social.map((item: any, i: number) => <Link key={`social-${i}`} href={item.link} passHref target={"_blank"}>

                <Icon name={item.name} className="w-8 h-8 text-surface-500" />

              </Link>)
            }
            <div className="flex items-center gap-1">
              <Icon name="phone" className="w-3 h-3" />
              <LinkContactTarget type="tel" info={phone}/>
            </div>
          </div>
          {/* <LinkIcons data={directorio} onClick={() => router.push(directorio.link)} /> */}
        </div>
      </div>
      <div className="p-6 w-d:hidden w-t:hidden flex flex-col border-b-[1px] border-solid border-surface-300">
        <div className="flex justify-between items-center mb-6">
          <div onClick={onClickLogo}>
            <div className="w-23 h-6 bg-logo bg-cover bg-center"> </div>
          </div>
          {/* <LinkIcons data={directorio} onClick={() => router.push(directorio.link)} /> */}
        </div>
        <div className="hidden">
          <p>Suscríbete a nuestro newsletter</p>
        </div>
      </div>
      {/* Section logotype */}
      <div className="p-6 w-t:hidden w-p:hidden flex gap-24 border-b-[1px] border-solid border-surface-300">
        {
          sections.map((section: any[], i: number) => <div key={`sections-${i}`} className="flex flex-col gap-6 w-64">
              {
                section.map((itemSection: any[], a: number) => {
                  return itemSection.map((item: any, j: number) => {
                    return (
                      <Fragment key={`section-access-${j}`}>
                        {
                          !!item.link
                            ? <Link href={item.link} passHref target={!!item.external ? "_blank" : "_self"}><p className={cn({ "font-bold": item.principal, "font-normal": !item.principal })}>{item.label}</p></Link>
                            : <p className={cn({ "font-bold": item.principal, "font-normal": !item.principal})}>{item.label}</p>
                        }
                      </Fragment>
                    );
                  });
                })
              }
            </div>)
        }
      </div>
      <div className="flex justify-between">
        <div className="p-6 flex flex-wrap gap-9 items-center w-d:hidden w-t:hidden">
          {
            social.map((item: any, i: number) => <Link key={`social-${i}`} href={item.link} passHref target={"_blank"}>

              <Icon name={item.name} className="w-8 h-8 text-balck" />

            </Link>)
          }
          <div className="flex items-center gap-1">
            <Icon name="phone" className="w-3 h-3" />
            <LinkContactTarget type="tel" info={phone}/>
          </div>
        </div>
        {/* <LinkIcons data={directorio} onClick={() => router.push(directorio.link)} /> */}
      </div>
      <div className="p-6 flex flex-col border-b-[1px] border-solid border-surface-300">
        <p className="mb-5">{ certifications.title }</p>
        <div className="flex gap-12 w-p:flex-wrap">
          {
            certifications.certificaciones.map(({ src, alt }: any, i: number) => <Image key={`certification-${i}`} classNamesImg="w-12 w-p:w-8 h-12 w-p:h-8" classNames="w-12 w-p:w-8 h-12 w-p:h-8 aspect-1/1" src={src} alt={alt} />)
          }
        </div>
      </div>
      <div className="p-6 w-t:p-2 w-p:p-4 flex justify-between">
        <p className="w-t:hidden w-p:hidden font-texts font-normal italic text-sm leading-4 text-surface-500">Derechos reservados <span className="text-surface-950">Lottus Education { year }</span></p>
        <p className="w-d:hidden font-texts font-normal italic text-sm leading-4 text-surface-500">&copy; <span className="text-surface-950">Lottus Education { year }</span></p>
        <Link href={privacyLink.link} passHref target={"_self"}>

          <p className="font-texts font-normal italic text-sm leading-4 text-surface-800 ">{privacyLink.label}</p>

        </Link>
      </div>
    </section>
  );
}

export default Footer