import { useRouter } from "next/router"
// import Footer from "@/old-components/FooterPortalverse"
// import Header from "@/old-components/HeaderPortalverse/HeaderPortalverse"
import HeaderFooterLayoutProps from "@/types/HeaderFooterLayout.types"
import Breadcrumbs from "@/old-components/Breadcrumbs/BreadcrumbPortalverse"
import ContentLayout from "@/layouts/Content.layout"
import HeaderConf from "@/config/header.json"
import FooterConf from "@/config/footer.json"
import Header from "@/components/sections/Header"
import Footer from "@/components/Footer"

export default function DynamicPageLayout({ children, breadcrumbs = true,layoutData }: HeaderFooterLayoutProps &any) {

  const { menus, logotype, menuMobile } = HeaderConf;
  const { privacyLink, certifications, logotype: logotipo, social, phone, directorio, sections } = FooterConf;

  const router = useRouter();

  const logotypeClick = () => router.push('/');

  const clickCTA = () => router.push("/admisiones/pedir-informacion");

  return <>
    <Header {...layoutData?.attributes?.header?.data?.attributes} />
    <div className="">
      { children }
      <Footer onClickLogo={logotypeClick} {...layoutData?.attributes?.footer?.data}/>
    </div>
  </>
}