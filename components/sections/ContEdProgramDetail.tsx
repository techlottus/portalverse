import Image from "next/image";
import Aspect from "@/components/Aspect";
import ContentLayout from "@/layouts/Content.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import type { FC } from "react";
import type { ProgramAttributes } from "@/utils/getProgramBySlug";
import cn from "classnames";

const mxnCurrency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const ContinuousEducationProgramDetail: FC<ProgramAttributes> = (props: ProgramAttributes) => {
  const { 
    name,
    programCategory,
    detail,
    image,
    price,
    offerPrice,
    priceDetail
   } = props;

  const programDetail = parseEditorRawData(detail);
  const programImage = image?.data?.attributes;
  const programPriceDetail = parseEditorRawData(priceDetail);

  return (
    <ContentLayout classNames="gap-6">
      <div className="col-span-6 w-t:col-span-4 w-p:col-span-4 ">
        {
          programCategory?.data?.attributes?.name ?
          <div className="mb-4">
            <h5 className="font-Poppins text-6 font-semibold">{programCategory?.data?.attributes?.name}</h5>
          </div>
          :null
        }
        <div className="flex flex-col gap-6">
          {
            name ?
              <h1 className="font-Poppins font-bold text-13 w-t:text-8.5 w-p:text-7.5 leading-13 w-t:leading-[111%] w-p:leading-[125%]">{name}</h1>
              : null
          }
          {
            programDetail ?
              <RichtText data={{
                content: programDetail
              }} />
              : null
          }
        </div>
      </div>
      <div className="col-span-6 w-t:col-span-4 w-p:col-span-4">
        {
          programImage?.url ?
          <Aspect ratio="2/1">
            <Image
              alt={programImage?.alternativeText || ""}
              src={programImage?.url}
              fill
            />
          </Aspect>
            : null
        }
        <div className="flex flex-col gap-2 p-2 border rounded-lg my-6">
          {
            !!price ?
              <div className="flex flex-col">
                <span className="font-Nunito-Sans font-normal text-base leading-5 text-[#818181]">Precio:</span>
                <div className="flex items-end gap-2">
                  <span
                    className={cn(
                        "font-Poppins font-semibold",
                        {
                          "text-8 leading-12": !offerPrice,
                          "text-2xl leading-10 line-through": !!offerPrice
                        }
                      )
                    }
                  >
                    {mxnCurrency?.format(price)}
                  </span>
                  {
                    offerPrice ?
                      <span className="text-4xl leading-12">{mxnCurrency?.format(offerPrice)}</span>
                      : null
                  }
                </div>
              </div>
              : null
          }
          {
            programPriceDetail ?
              <RichtText data={{
                content: programPriceDetail
              }} />
              : null
          }
        </div>
      </div>
    </ContentLayout>
  );
}

export default ContinuousEducationProgramDetail;