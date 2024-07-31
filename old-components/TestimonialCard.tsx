import Aspect from "@/components/Aspect";
import Image from "@/old-components/Image";
import type { TestimonialCardData } from "@/types/TestimonialCard";
import cn from "classnames";
import type { FC } from "react";
import RichtText from "./Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";

const TestimonialCard: FC<TestimonialCardData> = (props: TestimonialCardData) => {

  const {
    title,
    subtitle,
    testimonialText,
    testimonialImage
  } = props

  return (
    <div className="rounded-2xl bg-white">
      <div className="flex mobile:flex-col mobile:items-center px-10 py-6 mobile:py-10 mobile:px-6">
        {
          testimonialImage ?
            <div className="desktop:mr-6 tablet:mr-6 tablet: my-auto desktop:my-auto">
              <div className="w-44 h-44 tablet:w-32 tablet:h-32 mobile:w-32 mobile:h-32 mobile:mb-6">
              <Aspect ratio={"1/1"}>
                <Image
                  alt={"Programa de Nivel Superior"}
                  src={testimonialImage?.data?.attributes?.url}
                  classNamesImg="w-full h-full object-cover rounded-full "
                  classNames="w-full h-full flex justify-center"
                />
              </Aspect>
              </div>
            </div>
            : null
        }
        <div className="my-auto">
          {
            title ?
              <p className="desktop:text-6 text-base font-headings leading-8 desktop:font-semibold mb-2 mobile:mb-6">{title}</p>
              : null
          }
          {
            subtitle ?
              <p className="text-base font-texts leading-5 mb-3 text-surface-600 mobile:mb-6">{subtitle}</p>
              : null
          }
          {
            testimonialText ?
              <RichtText data={{
                content: parseEditorRawData(testimonialText)
              }} />
              : null
          }
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;