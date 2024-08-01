import { FC } from "react"
import Link from "next/link";
import errors from "@/multitenant-errors";
import { LinkConfig } from "@/types/Link.types";

export type WebErrorComponent = {
  title?: string;
  message?: string;
  errorCode?: string;
  button?: LinkConfig
};
const WebError: FC<WebErrorComponent> = (props: WebErrorComponent) => {
  
  const { title, message, button } = props;
  const errorCode = props?.errorCode || '404'

  return (
    <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-full flex font-headings justify-center items-center flex-col mx-auto">
      <h2 className="font-bold text-10 w-t:text-7.5 w-p:text-base leading-8.6 w-t:leading-9.375 w-p:leading-5.2 pt-18 pb-10 w-t:pt-12 w-t:pb-10 w-p:pt-12 w-p:pb-10">{title ? title : errors?.[errorCode]?.default_title || 'Lo sentimos'}</h2>
      <img src={!!errorCode ? errors?.[errorCode]?.image : "@/public/images/404-B.jpg"} alt="error_image" className="w-96 h-72 w-t:w-135.5 w-t:h-100 w-p:w-78 w-p:h-58.5 aspect-4/3 select-none" />
      <p className="text-surface-600 font-semibold text-5.5 w-t:text-6 w-p:text-base py-6 w-p:pt-6 w-p:pb-4 leading-7.15 w-t:leading-8">{message ? message : errors?.[errorCode]?.default_message || 'hubo un error inesperado'}</p>
      { !!button ? 
        <Link
          href={button?.href ? `${button?.href}` : '/'}
          className="font-texts py-4 px-8 w-p:w-full w-p:text-center font-bold w-p:text-5 bg-surface-950 rounded-lg text-surface-0 text-base mb-13.75 w-t:mb-12 w-p:mb-16.5">
          { button?.text || "Regresar al inicio" }
        </Link>
        : <Link
        href={'/'}
        className="font-texts py-4 px-8 w-p:w-full w-p:text-center font-bold w-p:text-5 bg-surface-950 rounded-lg text-surface-0 text-base mb-13.75 w-t:mb-12 w-p:mb-16.5">
         Regresar al inicio
      </Link>
      }
    </section>
  );
}

export default WebError