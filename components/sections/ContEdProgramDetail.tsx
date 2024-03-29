import Image from "next/image";
import Aspect from "@/components/Aspect";
import ContentLayout from "@/layouts/Content.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import type { FC } from "react";
import type { ProgramAttributes } from "@/utils/getProgramBySlug";
import IntroductionProgram from "@/old-components/IntroducctionProgram";

const mxnCurrency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const ContinuousEducationProgramDetail: FC<ProgramAttributes> = (props: ProgramAttributes) => {
  const { 
    name,
    programCategory,
    detail,
    description,
    image,
    certificationMessage,
    price,
    offerPrice,
    priceDetail,
    discount,
    discountPercentageText,
    periodicity,
    checkoutUrl,
    checkoutUrlText,
    programPerks,
    brands
   } = props;

  const programDescription = description
  const programDetail = parseEditorRawData(detail);
  const programImage = image?.data?.attributes;
  const programPriceDetail = parseEditorRawData(priceDetail);

  return (
    <ContentLayout classNames="gap-6">
      {/* <div className="col-span-6 w-t:col-span-4 w-p:col-span-4 ">
        {
          programCategory?.data?.attributes?.name ?
          <div className="mb-4">
            <h5 className="font-headings text-6 font-semibold">{programCategory?.data?.attributes?.name}</h5>
          </div>
          :null
        }
        <div className="flex flex-col gap-6">
          {
            name ?
              <h1 className="font-headings font-bold text-13 w-t:text-8.5 w-p:text-7.5 leading-13 w-t:semi-tight w-p:leading-tight">{name}</h1>
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
        <div className="flex flex-col gap-2 p-2 border border-solid border-surface-300 rounded-lg my-6">
          {
            !!price ?
              <div className="flex flex-col">
                <span className="font-texts font-normal text-base leading-5 text-surface-500">Precio:</span>
                <div className="flex items-end gap-2">
                  <span
                    className={cn(
                        "font-headings font-semibold",
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
      </div> */}
      <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <IntroductionProgram 
          title={name} 
          brands={brands?.data}
          programPerks={programPerks?.data}
          checkoutUrlText={checkoutUrlText}
          label={programCategory?.data?.attributes?.name} 
          description={programDescription} 
          periodicity={periodicity} 
          certificationMessage={certificationMessage} 
          price={price} 
          offerPrice={offerPrice}  
          discount={discount}
          checkoutUrl={checkoutUrl}
          discountPercentajeText={discountPercentageText}
          image={{
          alt: name,
          src: programImage?.url
        }} />
      </div>
      {
            programDetail ?
             <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
               <RichtText data={{
                content: programDetail
              }} />
             </div>
              : null
          }
    </ContentLayout>
  );
}

export default ContinuousEducationProgramDetail;