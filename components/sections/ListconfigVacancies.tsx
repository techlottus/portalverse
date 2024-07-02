import Container from "@/layouts/Container.layout";
import type { ListconfigData } from "@/utils/strapi/sections/Listconfig";
import { useRouter } from "next/router";
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse";
import parseEditorRawData from "@/utils/parseEditorRawData";

const ListconfigVacancies = (props: ListconfigData) => {
  const { title, relatesto, data } = props;
  const router = useRouter();

  if (relatesto !== "vacancies") return null;

  const vacancies = data?.vacancies || [];
  console.log(vacancies)
  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {
            title
              ? <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:mt-6 w-p:mt-6">
                <p className="font-headings font-bold text-8.5 w-t:text-6 w-p:text-6 semi-tight w-t:leading-tight w-p:leading-tight">
                  {title}
                </p>
              </div>
              : null
          }
          {
            vacancies?.length > 0
              ? <div className="grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
                {
                  vacancies?.map((vacant, i) => 
                    
                    (                    
                    <div key={`section-blog-${i}`}>
                      
                      <CardWebsitePortalverse
                        data={{
                          ...vacant,
                          image: vacant?.attributes?.featured_image?.data?.attributes?.url,
                          text: parseEditorRawData(vacant?.attributes.body),
                          title: vacant?.attributes?.title,
                          background: true,
                          border: true,
                          type: "vertical",
                          isLink: !!vacant?.attributes?.slug,
                          link: {
                            text: "Ver más",
                            size: "large",
                            isUnderline: false,
                            isBold: true,
                            disabled: false,
                            id: "",
                            iconFirst: "",
                            iconSecond: "arrow_left"
                          },
                          aspect: "2/1"
                        }}                        
                         onClick={!!vacant?.attributes?.slug ? () => {                          
                            router.push(vacant?.attributes?.slug)
                        } : undefined
                        
                        }
                        
                      />
                    </div>
                  ))
                }
                
              </div>
              
              : null
          }

        </div>
      </Container>
    </section>
  );
};

export default ListconfigVacancies;
