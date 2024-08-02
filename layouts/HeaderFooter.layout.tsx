import { useRouter } from "next/router"
import Footer from "@/old-components/FooterPortalverse"
import Header from "@/old-components/HeaderPortalverse/HeaderPortalverse"
import HeaderFooterLayoutProps from "@/types/HeaderFooterLayout.types"
import Breadcrumbs from "@/old-components/Breadcrumbs/BreadcrumbPortalverse"
import ContentLayout from "@/layouts/Content.layout"
import HeaderConf from "@/config/header.json"
import FooterConf from "@/config/footer.json"

export default function HeaderFooterLayout({ children, breadcrumbs = true }: HeaderFooterLayoutProps) {

  const { menus, logotype, menuMobile } = HeaderConf;
  const { privacyLink, certifications, logotype: logotipo, social, phone, directorio, sections } = FooterConf;

  const router = useRouter();

  const logotypeClick = () => router.push('/');

  const clickCTA = () => router.push("/admisiones/pedir-informacion");

  return <>
    <Header menus={menus} menusMobile={menuMobile} onClickLogo={logotypeClick} onClickCTA={clickCTA} />
    <div className="desktop:pt-24 pt-12">
      <ContentLayout>
        <Breadcrumbs classNames="col-span-12 tablet:col-span-8 mobile:col-span-4" visible={breadcrumbs} />
      </ContentLayout>
      { children }
      <Footer onClickLogo={logotypeClick} privacyLink={privacyLink} certifications={certifications} logotype={logotipo} social={social} phone={phone} directorio={directorio} sections={sections} />
    </div>
  </>
}