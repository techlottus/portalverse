import { FC, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import cn from "classnames"
import BreadcrumbsComponentData from "@/types/BreadcrumbsPortalverse.types"
import StaticPagesBreadcrumbsLabels from "@/routes/breadcrumbs.labels"

const Breadcrumbs: FC<BreadcrumbsComponentData> = ({ visible = true, classNames, breadcrumbs = {} }: BreadcrumbsComponentData) => {
  const mainRoute = <span className="material-symbols-outlined mr-1 select-none">home</span>;
  const { asPath } = useRouter();
  const [ allRoutes, setAllRoutes ] = useState<Array<string>>([]);

  const breadcrumbsLabels = {...breadcrumbs, ...StaticPagesBreadcrumbsLabels};

  useEffect(() => {
    const routes = Array.from(asPath.split("/"));
    setAllRoutes([...routes]);
  }, [asPath]);

  const Crumb = (text: string, position: number, router: Array<string>, last = false) => {

    const url = router.slice(0, position+1).join("/");
    let cleanText = text;
    if(text.includes("?") && last){
      cleanText = text.split("?")[0]
    }
    if(text.includes("#") && last){
      cleanText = text.split("#")[0]
    }
    const label = !!breadcrumbsLabels[cleanText] ? breadcrumbsLabels[cleanText] : cleanText

    return text === ''
      ? last
        ? mainRoute
        : <Link href={"/"} className="font-texts font-normal text-xs">{mainRoute}</Link>
      : !last
        ? <Link href={url} className="flex"><p className="font-texts font-normal text-xs mr-1 text-surface-800 ">/</p><p className="mr-1 font-texts font-normal text-xs line-clamp-1 md:line-clamp-none">{ label }</p></Link>
        : <span className="flex"><p className="font-texts font-normal text-xs mr-1 text-surface-800 ">/</p><p className="text-primary-500 font-texts font-normal text-xs line-clamp-1 md:line-clamp-none">{ label }</p></span>;
  }

  return <ul className={cn("breadcrumbs w-full flex my-6 font-texts font-bold text-xs   text-surface-500", classNames, { "hidden": !visible })} aria-label="breadcrumbs">
    {
      allRoutes.map((route: string, i: number, arr: Array<string>) => <li key={`crumb-${i}`} className="line-clamp-1 md:line-clamp-none">{Crumb( route, i, arr, i === (arr.length - 1) )}</li>)
    }
  </ul>
}

export default Breadcrumbs