import { useRouter } from "next/router"
import Footer from "@/old-components/FooterPortalverse"
// import Header from "@/old-components/HeaderPortalverse/HeaderPortalverse"
import HeaderFooterLayoutProps from "@/types/HeaderFooterLayout.types"
import Breadcrumbs from "@/old-components/Breadcrumbs/BreadcrumbPortalverse"
import ContentLayout from "@/layouts/Content.layout"
import HeaderConf from "@/config/header.json"
import FooterConf from "@/config/footer.json"
import Header from "@/components/sections/Header"

export default function DynamicPageLayout({ children, breadcrumbs = true,layoutData }: HeaderFooterLayoutProps &any) {

  const { menus, logotype, menuMobile } = HeaderConf;
  const { privacyLink, certifications, logotype: logotipo, social, phone, directorio, sections } = FooterConf;

  const router = useRouter();

  const logotypeClick = () => router.push('/');

  const clickCTA = () => router.push("/admisiones/pedir-informacion");

  return <>
    <Header {...layoutData?.attributes?.header?.data?.attributes} />
    <div className="desktop:pt-30">
      { children }
      <Footer onClickLogo={logotypeClick} privacyLink={privacyLink} certifications={certifications} logotype={logotipo} social={social} phone={phone} directorio={directorio} sections={sections} />
    </div>
  </>
}