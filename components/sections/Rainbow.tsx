import { FC, memo } from "react";
import Container from "@/layouts/Container.layout";
import { RainbowSection } from "@/utils/strapi/sections/Rainbow";
import Outstanding from "./Outstanding";

const Rainbow: FC<RainbowSection> = memo((props: RainbowSection) => {
  const { title, outstandings } = props;

  return (
    <section>
      <Container>
        <div className="flex flex-col ">
          {
            title
              ? <h3 className="font-headings text-10 font-bold leading-tight w-t:text-8.5 w-p:text-6 w-d:pb-10 pb-6">{title}</h3>
              : null
          }
          {
            outstandings?.length > 0
              ? <div className="flex flex-col items-start w-full">
                {
                  outstandings?.map((outs, i) => {

                    return (
                      <div key={i} className="w-full">
                        <Outstanding type="ComponentSectionsOutstandingRainbow"
                          {...outs} />
                      </div>
                    )
                  })
                }
              </div>
              : null
          }
        </div>
      </Container>
    </section>
  );
})

export default Rainbow