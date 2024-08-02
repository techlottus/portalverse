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
    <section className="col-span-12 tablet:col-span-8 mobile:col-span-4 w-full flex font-headings justify-center items-center flex-col mx-auto">
      <h2 className="font-bold text-10 tablet:text-7.5 mobile:text-base leading-8.6 tablet:leading-9.375 mobile:leading-5.2 pt-18 pb-10 tablet:pt-12 tablet:pb-10 mobile:pt-12 mobile:pb-10">{title ? title : errors?.[errorCode]?.default_title || 'Lo sentimos'}</h2>
      <img src={!!errorCode ? errors?.[errorCode]?.image : "@/public/images/404-B.jpg"} alt="error_image" className="w-96 h-72 tablet:w-135.5 tablet:h-100 mobile:w-78 mobile:h-58.5 aspect-4/3 select-none" />
      <p className="text-surface-600 font-semibold text-5.5 tablet:text-6 mobile:text-base py-6 mobile:pt-6 mobile:pb-4 leading-7.15 tablet:leading-8">{message ? message : errors?.[errorCode]?.default_message || 'hubo un error inesperado'}</p>
      { !!button ? 
        <Link
          href={button?.href ? `${button?.href}` : '/'}
          className="font-texts py-4 px-8 mobile:w-full mobile:text-center font-bold mobile:text-5 bg-surface-950 rounded-lg text-surface-0 text-base mb-13.75 tablet:mb-12 mobile:mb-16.5">
          { button?.text || "Regresar al inicio" }
        </Link>
        : <Link
        href={'/'}
        className="font-texts py-4 px-8 mobile:w-full mobile:text-center font-bold mobile:text-5 bg-surface-950 rounded-lg text-surface-0 text-base mb-13.75 tablet:mb-12 mobile:mb-16.5">
         Regresar al inicio
      </Link>
      }
    </section>
  );
}

export default WebError