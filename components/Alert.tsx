import { FC } from "react"
import RichtText from "@/old-components/Richtext/Richtext"
import { AlertSection } from "@/utils/strapi/sections/Alert"

const Alert: FC<AlertSection> = ({ title, text, iconContact, iconLeft, ctaUrl, linkText }: AlertSection) => {

  return <>
  <div className="border-2 rounded-lg flex">
    {
      iconLeft
      ? <div className=""><span className="material-icons pl-4 pt-4">{ iconLeft }</span></div>
      : null
    }
    <div className="pl-4">
      <p className="font-normal font-Nunito text-5 my-4">{title}</p>
      <RichtText data={{
          content: text
      }} />    
      {
        linkText
        ? <div className="flex items-center mb-4">
            <span className="font-normal material-icons">{iconContact}</span>
            <span className="font-normal hover:underline">{linkText}</span>
        </div>
        : null
      }
    </div>
  </div>
  </>
  
}

export default Alert