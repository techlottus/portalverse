import { FC, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import cn from "classnames"
import BreadcrumbsComponentData from "@/types/BreadcrumbsPortalverse.types"
import StaticPagesBreadcrumbsLabels from "@/routes/breadcrumbs.labels"

const Breadcrumbs: FC<BreadcrumbsComponentData> = ({ visible = true, classNames, breadcrumbs = {} }: BreadcrumbsComponentData) => {
  const mainRoute = <span className="material-icons mr-1">home</span>;
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
        : <Link href={"/"} className="font-Nunito-Sans font-normal text-xs">{mainRoute}</Link>
      : !last
        ? <Link href={url} className="flex"><p className="font-Nunito-Sans font-normal text-xs mr-1 text-[#282828]">/</p><p className="mr-1 font-Nunito-Sans font-normal text-xs">{ label }</p></Link>
        : <span className="flex"><p className="font-Nunito-Sans font-normal text-xs mr-1 text-[#282828]">/</p><p className="text-[#282828] font-Nunito-Sans font-normal text-xs">{ label }</p></span>;
  }

  return <ul className={cn("breadcrumbs w-full flex my-6 font-Nunito font-bold text-xs text-[#686868]", classNames, { "hidden": !visible })} aria-label="breadcrumbs">
    {
      allRoutes.map((route: string, i: number, arr: Array<string>) => <li key={`crumb-${i}`}>{Crumb( route, i, arr, i === (arr.length - 1) )}</li>)
    }
  </ul>
}

export default Breadcrumbs