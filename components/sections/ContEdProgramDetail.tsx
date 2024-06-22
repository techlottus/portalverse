import Image from "next/image";
import Aspect from "@/components/Aspect";
import ContentLayout from "@/layouts/Content.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import type { FC } from "react";
import type { ProgramAttributes } from "@/utils/getProgramBySlug";
import IntroductionProgram from "@/old-components/IntroducctionProgram";
import PaymentCardContainer from "./PaymentCardContainer";
import ContentFullLayout from "@/layouts/ContentFull.layout";

const mxnCurrency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const ContinuousEducationProgramDetail: FC<ProgramAttributes> = (props: ProgramAttributes) => {
  const {
    id,
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
    brands,
    price_list
  } = props;

  const programDescription = description
  const programDetail = parseEditorRawData(detail);
  const programImage = image?.data?.attributes;
  const programPriceDetail = parseEditorRawData(priceDetail);
  return (
    <ContentFullLayout>
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
            price={price_list ? null : price}
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
      
      {
        !!price_list && <PaymentCardContainer
          program={id}
          title={"¡Asegura tu lugar! Opciones de "}
          accent_title={"pago flexibles"}
          subtitle={""}
          price_list={{ ...price_list }}
          text="Nota importante: Los pagos parciales se efectúan en intervalos mensuales, cada 30 días a partir de la fecha de tu primer pago. El número de pagos corresponde al plan de parcialidades que hayas seleccionado al inscribirte. Esta secuencia se mantendrá hasta completar el costo total del curso."
        />
      }
    </ContentFullLayout>

  );
}

export default ContinuousEducationProgramDetail;