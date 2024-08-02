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
    <section className="w-full border-t border-0 border-solid border-surface-800 mt-18 tablet:mt-12 mobile:mt-12">
      {/* Section logotype */}
      <div className="p-6 mobile:hidden border-b  border-0 border-solid border-surface-300">
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
      <div className="p-6 desktop:hidden tablet:hidden flex flex-col border-b  border-0 border-solid border-surface-300">
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
      <div className="p-6 tablet:hidden mobile:hidden flex gap-24 border-b  border-0 border-solid border-surface-300">
        {
          sections?.map((section: any[], i: number) => <div key={`sections-${i}`} className="flex flex-col gap-6 w-64">
              {
                section?.map((itemSection: any[], a: number) => {
                  return itemSection.map((item: any, j: number) => {
                    return (
                      <Fragment key={`section-access-${j}`}>
                        {
                          !!item?.link
                            ? <Link href={item.link} passHref target={!!item.external ? "_blank" : "_self"}><p className={cn({ "font-headings font-bold": item?.principal, "font-texts font-normal": !item?.principal })}>{item?.label}</p></Link>
                            : <p className={cn({ "font-headings font-bold": item.principal, "font-texts font-normal": !item.principal})}>{item.label}</p>
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
        <div className="p-6 flex flex-wrap gap-9 items-center desktop:hidden tablet:hidden">
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
      <div className="p-6 flex flex-col border-b  border-0 border-solid border-surface-300">
        <p className="mb-5">{ certifications.title }</p>
        <div className="flex gap-12 flex-wrap">
          {
            certifications.certificaciones.map(({ src, alt }: any, i: number) => <Image key={`certification-${i}`} classNamesImg="!w-auto !h-12 !relative" src={src} alt={alt} />)
          }
        </div>
      </div>
      <div className="p-6 tablet:p-2 mobile:p-4 flex justify-center">
        {/* <p className="tablet:hidden mobile:hidden font-texts font-normal italic text-sm leading-4 text-surface-500">Derechos reservados <span className="text-surface-950">Lottus Education { year }</span></p>
        <p className="desktop:hidden font-texts font-normal italic text-sm leading-4 text-surface-500">&copy; <span className="text-surface-950">Lottus Education { year }</span></p> */}
        <Link href={privacyLink.link} passHref target={"_self"}>
          <p className="font-texts font-normal italic text-sm leading-4 text-surface-800 ">{privacyLink.label}</p>
        </Link>
      </div>
    </section>
  );
}

export default Footer