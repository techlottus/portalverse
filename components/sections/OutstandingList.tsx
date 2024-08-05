import { FC, memo } from "react";
import Container from "@/layouts/Container.layout";
import type { OutstandingListSection } from "@/utils/strapi/sections/OutstandingList";
import Outstanding from "./Outstanding";

const Rainbow: FC<OutstandingListSection> = memo((props: OutstandingListSection) => {
  const { title, outstandings } = props;
  return (
    <section>
      <Container>
        <div className="flex flex-col ">
          {
            title
              ? <h2 className="font-headings text-10 font-bold leading-tight w-t:text-8.5 w-p:text-6 w-d:pb-10 pb-6">{title}</h2>
              : null
          }
          <div className="flex flex-col items-start w-full">
            {
              outstandings?.map((outs, i) => {
                return (
                  <div key={i} className="w-full desktop:mb-18 mb-12 last:mb-0">
                    <Outstanding
                      {...outs} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </Container>
    </section>
  );
})

export default Rainbow