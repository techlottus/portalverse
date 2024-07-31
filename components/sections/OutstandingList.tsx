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
              ? <h2 className="font-headings text-10 font-bold leading-tight tablet:text-8.5 mobile:text-6 desktop:pb-10 pb-6">{title}</h2>
              : null
          }
          <div className="flex flex-col items-start w-full">
            {
              outstandings?.map((outs, i) => {
                return (
                  <div key={i} className="w-full">
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