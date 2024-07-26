import { FC } from "react";
import { GoogleMapSection } from "@/utils/strapi/sections/GoogleMap";
import Aspect from "@/components/Aspect";
import cn from "classnames";
import Container from "@/layouts/Container.layout";
const GoogleMap: FC<GoogleMapSection> = (props: GoogleMapSection) => {
  const {
    title,
    src,
    name,
    address,
    receptionPhone,
    admissionPhone,
    schedule,
    variant = 'map',
    detailPosition = 'top'
  } = props;

  const srcRegex = /[https://www.google.com/maps/embed/]*/g;
  const validSrc = srcRegex.test(src);

  const renderMap = (src: string) => {
    return (
      <iframe
        className="w-full h-full rounded-xl w-t:w-4/5 w-t:h-2/3 w-t:mx-auto"
        src={src}
        style={{ border: 0 }}
        loading="lazy" ></iframe>
    );
  };

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {
            title ? <h3 className="font-headings text-10 font-bold leading-tight text-center w-t:text-8.5 w-p:text-6">{title}</h3> : null
          }
          {/* {
            title ? <Heading variant="h3" as="h2">{title}</Heading> : null
          } */}
          {
            variant === 'map' ?
              <div className="w-full h-full">
                <Aspect ratio='2/1'>{validSrc ? renderMap(src) : null}</Aspect>
              </div>
              :
              variant === 'tour' && detailPosition !== 'top' ?
                (<div className={cn("flex w-d:flex-row flex-col my-auto px-16 w-p:px-0", { 'w-d:flex-row-reverse': detailPosition === "right" })}>
                  <div className={cn("flex flex-col items-start w-d:w-3/6 w-t:w-4/5 mx-auto pb-4 my-auto w-d:px-12", { "": detailPosition === 'right' })}>
                    <h3>{name}</h3>
                    {/* <Heading variant="h3">{name}</Heading> */}
                    {address && <div className="flex flex-col items-start">
                      <div className="flex">
                        <span className="material-symbols-outlined font-normal select-none mr-1">location_on</span>
                        <span className="font-bold text-surface-600">Dirección</span>
                      </div>
                      <span className="font-normal text-surface-500 hover:underline">{address}</span>
                    </div>}
                    {schedule && <div className="flex flex-col items-start my-6">
                      <div className="flex">
                        <span className="material-symbols-outlined font-normal select-none mr-1">event_available</span>
                        <span className="font-bold text-surface-600">Horarios:</span>
                      </div>
                      <span className="font-normal text-surface-500 hover:underline">{schedule}</span>
                    </div>}
                    {admissionPhone &&
                      <div>
                        <div className="flex mb-1">
                          <span className="material-symbols-outlined font-normal select-none mr-1">call</span>
                          <span className="font-bold text-surface-600">Teléfonos</span>
                        </div>
                        <div className="flex flex-row items-start gap-6 w-p:gap-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-surface-500">Admisiones</span>
                            <span className="font-normal text-surface-500 underline">{admissionPhone}</span>
                          </div>
                          {receptionPhone &&
                            <div className="flex flex-col">
                              <span className="font-bold text-surface-500">Recepción</span>
                              <span className="font-normal text-surface-500 underline">{receptionPhone}</span>
                            </div>}
                        </div>
                      </div>
                    }
                  </div>
                  {
                    validSrc ?
                      <div className="w-d:w-3/5 w-full h-auto rounded-lg">
                        <Aspect ratio="4/3">
                          {renderMap(src)}
                        </Aspect>
                      </div>
                      : null
                  }
                </div>)
                :
                <div className="w-d:px-16 flex flex-col space-y-4">
                  <div className="flex place-content-between w-d:flex-row flex-col ">
                    <h3 className="font-Poppins text-10 pb-4 font-bold leading-[125%] w-t:text-8.5 w-p:text-6">{name}</h3>
                    {/* <Heading variant="h3" className="font-Poppins pb-4">{name}</Heading> */}
                    <div className="flex flex-col items-start space-y-4 w-d:w-2/5 right-0">
                      {address && <div className="flex items-center space-y-2 space-x-2 ">
                        <span className="material-symbols-outlined font-normal select-none">location_on</span>
                        <span className="font-normal text-surface-600 hover:underline">{address}</span>
                      </div>}
                      {admissionPhone && <div className="flex  items-center space-y-2 space-x-2">
                        <span className="material-symbols-outlined font-normal select-none">call</span>
                        <span className="font-normal text-surface-600 hover:underline">{admissionPhone}</span>
                      </div>}
                      {receptionPhone && <div className="flex  items-center space-y-2 space-x-2">
                        <span className="material-symbols-outlined font-normal select-none">call</span>
                        <span className="font-normal text-surface-600 hover:underline">{receptionPhone}</span>
                      </div>}
                      {schedule && <div className="flex items-center space-y-2 space-x-2">
                        <span className="material-symbols-outlined font-normal select-none">event_available</span>
                        <span className="font-normal text-surface-600 hover:underline">{schedule}</span>
                      </div>}</div>
                  </div>
                  {validSrc ?
                    <div className="w-full">
                      <Aspect ratio="2/1">
                        {renderMap(src)}
                      </Aspect>
                    </div>
                    : null}
                </div>
          }
        </div>
      </Container>
    </section>
  )
}

export default GoogleMap