import { FC } from "react";
import { GoogleMapSection } from "@/utils/strapi/sections/GoogleMap";
import Aspect from "@/components/Aspect";
import cn from "classnames";
const GoogleMap: FC<GoogleMapSection> = (props: GoogleMapSection) => {
  const {
    src,
    name,
    address,
    receptionPhone,
    admissionPhone,
    schedule,
    variant,
    detailPosition
  } = props;

  const srcRegex = /[https://www.google.com/maps/embed/]*/g;
  const validSrc = srcRegex.test(src);

  const renderMap = (src: string) => {
    return (
      <iframe
        className="w-full h-full"
        src={src}
        style={{ border: 0 }}
        loading="lazy" ></iframe>
    );
  };



  return (
    <section className="px-12">
      {
        variant === 'map' ?
          <div className="w-full h-full">
            <Aspect ratio='2/1'>{validSrc ? renderMap(src) : null}</Aspect>
          </div>
          :
          variant === 'tour' && detailPosition !== 'top' ?
            (<div className={cn("flex w-d:flex-row flex-col ", { 'w-d:flex-row-reverse': detailPosition === "right" })}>
              <div className="flex flex-col items-start space-y-4 w-d:w-2/5 w-full w-d:px-4 pb-4">
                <h1>{name}</h1>
                {address && <div className="flex flex-col items-start space-y-2">
                  <span className="material-icons font-normal">location_on</span>
                  <span className="font-bold text-surface-400">Dirección</span>
                  <span className="font-normal text-surface-400 hover:underline">{address}</span>
                </div>}
                {admissionPhone &&
                  <div className="flex flex-col items-start space-y-2">
                    <span className="material-icons font-normal">call</span>
                    <span className="font-bold text-surface-400">Teléfono Admisiones:</span>
                    <span className="font-normal text-surface-400 hover:underline">{admissionPhone}</span>
                  </div>}
                {receptionPhone && <div className="flex flex-col items-start space-y-2">
                  <span className="material-icons font-normal">call</span>
                  <span className="font-bold text-surface-400">Teléfono Admisiones:</span>
                  <span className="font-normal text-surface-400 hover:underline">{receptionPhone}</span>
                </div>}
                {schedule && <div className="flex flex-col items-start space-y-2">
                  <span className="material-icons font-normal">event_available</span>
                  <span className="font-bold text-surface-400">Horarios:</span>
                  <span className="font-normal text-surface-400 hover:underline">{schedule}</span>
                </div>}
              </div>
              <div className="w-d:w-3/5 w-full h-auto ">
                <Aspect ratio="4/3">
                  {validSrc ? renderMap(src) : null}
                </Aspect>
              </div>
            </div>)
            :
            <div className="w-d:px-4 flex flex-col space-y-4">
              <div className="flex place-content-between w-d:flex-row flex-col ">
                <h1 className="font-Poppins text-10 pb-4 font-bold leading-[125%] w-t:text-8.5 w-p:text-6">{name}</h1>
                <div className="flex flex-col items-start space-y-4 w-d:w-2/5 right-0">
                  {address && <div className="flex items-center space-y-2 space-x-2 ">
                    <span className="material-icons font-normal">location_on</span>
                    <span className="font-normal text-surface-400 hover:underline">{address}</span>
                  </div>}
                  {admissionPhone && <div className="flex  items-center space-y-2 space-x-2">
                    <span className="material-icons font-normal">call</span>
                    <span className="font-normal text-surface-400 hover:underline">{admissionPhone}</span>
                  </div>}
                  {receptionPhone && <div className="flex  items-center space-y-2 space-x-2">
                    <span className="material-icons font-normal">call</span>
                    <span className="font-normal text-surface-400 hover:underline">{receptionPhone}</span>
                  </div>}
                  {schedule && <div className="flex items-center space-y-2 space-x-2">
                    <span className="material-icons font-normal">event_available</span>
                    <span className="font-normal text-surface-400 hover:underline">{schedule}</span>
                  </div>}</div>
              </div>
              <div className="w-full">
                <Aspect ratio="2/1">
                  {validSrc ? renderMap(src) : null}
                </Aspect>
              </div>
            </div>
      }
    </section>
  )
}

export default GoogleMap