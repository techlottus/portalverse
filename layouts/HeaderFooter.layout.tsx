import { useRouter } from "next/router"
import Footer from "@/old-components/FooterPortalverse"
// import Header from "@/old-components/HeaderPortalverse/HeaderPortalverse"
import HeaderFooterLayoutProps from "@/types/HeaderFooterLayout.types"
import Breadcrumbs from "@/old-components/Breadcrumbs/BreadcrumbPortalverse"
import ContentLayout from "@/layouts/Content.layout"
import HeaderConf from "@/config/header.json"
import FooterConf from "@/config/footer.json"
import Header from "@/components/sections/Header"

export default function HeaderFooterLayout({ children, breadcrumbs = true }: HeaderFooterLayoutProps) {

  const { menus, logotype, menuMobile } = HeaderConf;
  const { privacyLink, certifications, logotype: logotipo, social, phone, directorio, sections } = FooterConf;

  const router = useRouter();

  const logotypeClick = () => router.push('/');

  const clickCTA = () => router.push("/admisiones/pedir-informacion");
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
        "CTA": "/pedir-informacion",
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
        "subitems": [
          {
            "id": "4",
            "label": "Salud",
            "bold": true,
            "href": "/salud",
            "items": []
          },
          {
            "id": "5",
            "label": "Licenciatura en Psicología",
            "bold": false,
            "href": "/licenciatura",
            "items": [
              {
                "id": "20",
                "label": "Licenciatura en Contaduría y Finanzas",
                "bold": true,
                "href": null,
                "items": [
                  {
                    "id": "1",
                    "label": "Licenciatura en Psicología",
                    "href": null,
                    "bold": true
                  },
                  {
                    "id": "2",
                    "label": "Licenciatura en Nutrición",
                    "href": null,
                    "bold": false
                  },
                  {
                    "id": "3",
                    "label": "Licenciatura en Fisioterapia",
                    "href": null,
                    "bold": false
                  }
                ]
              },
              {
                "id": "19",
                "label": "Licenciatura en Cirujano Dentista",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "18",
                "label": "Licenciatura en Derecho",
                "bold": false,
                "href": null,
                "items": []
              }
            ]
          }
        ]
      },
      {
        "id": "2",
        "label": "Oferta Academica",
        "subitems": [
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
            "id": "1",
            "label": "Bachillerato",
            "bold": false,
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
            "id": "1",
            "label": "Bachillerato",
            "bold": false,
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
            "id": "1",
            "label": "Bachillerato",
            "bold": false,
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
                "items": []
              },
              {
                "id": "2",
                "label": "Licenciatura en Administración de Empresas",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "1",
                "label": "Licenciatura Ejecutiva en Comercio Internacional",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "4",
                "label": "Licenciatura en Contaduría y Finanzas",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "6",
                "label": "Licenciatura en Mercadotecnia",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "5",
                "label": "Licenciatura en Turismo",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "7",
                "label": "Salud",
                "bold": true,
                "href": null,
                "items": []
              },
              {
                "id": "8",
                "label": "Licenciatura en Psicología",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "9",
                "label": "Licenciatura en Nutrición",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "11",
                "label": "Licenciatura en Fisioterapia",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "10",
                "label": "Licenciatura en Cirujano Dentista",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "12",
                "label": "Ingeniería y Tecnologías",
                "bold": true,
                "href": null,
                "items": []
              },
              {
                "id": "13",
                "label": "Licenciatura en Ingeniería en Sistemas Computacionales",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "14",
                "label": "Licenciatura Ejecutiva en Comercio Internacional",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "17",
                "label": "Licenciatura en Contaduría y Finanzas",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "16",
                "label": "Licenciatura en Mercadotecnia",
                "bold": false,
                "href": null,
                "items": []
              },
              {
                "id": "15",
                "label": "Licenciatura en Turismo",
                "bold": false,
                "href": null,
                "items": []
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
          "desktopRatio": "2/1",
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
          "contentVariant": "dark"
        },
        {
          "title": "Banner 2",
          "subtitle": "contenido de banner 2",
          "desktopRatio": "2/1",
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
          "overlay": "black",
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
  return <>
    <Header links_button={data.links_button} menu_items={data.menu_items} banners={data.banners} alert={data.alert}/>
    <div className="desktop:pt-24 pt-12">
      <ContentLayout>
        <Breadcrumbs classNames="col-span-12 w-t:col-span-8 w-p:col-span-4" visible={breadcrumbs} />
      </ContentLayout>
      { children }
      <Footer onClickLogo={logotypeClick} privacyLink={privacyLink} certifications={certifications} logotype={logotipo} social={social} phone={phone} directorio={directorio} sections={sections} />
    </div>
  </>
}