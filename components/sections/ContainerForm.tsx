import { FC } from "react"
import Link from "next/link";
import errors from "../../multitenant-errors";
import { LinkConfig } from "@/types/Link.types";
import OpenForm from "@/forms/container/OpenForm";
import StepOne from "@/forms/steps/step-one-openform";
import StepTwo from "@/forms/steps/step-two-openform";
import ProgressBar from "@/old-components/ProgressBar/ProgressBar";
import Image from "@/old-components/Image"
import * as ImageType from "@/types/Image.type";
import Button from "@/old-components/Button/Button";


type privacyPolicy = {
  text: string;
  linkText: string;
  file: any
}

type SelectForm = {
  formFragment: string;
}
type Form = {
  action?: string;
  selectForms: SelectForm[];
}
type Step = {
  stepTitle?: string;
  form: Form;
}
type ContainerFormComponent = {
  title: string;
  description: string;
  subtitle: string;
  privacyPolicy: privacyPolicy;
  steps: Step[];
  image: any;
  showProgress: boolean;
  button: {
    label: string 	
    variant: string 	
    size: string 	
    iconName: string 	
    CTA: string 
  }
}

const ContainerForm: FC<ContainerFormComponent> = (props: ContainerFormComponent) => {

  const { steps, title, subtitle, privacyPolicy, image, description, showProgress, button } = props

  
  const getSteps = () => {

    steps.map(step => {
      step.form.selectForms.map(form => {
        switch (form.formFragment) {
          case "Datos de contacto":
            StepOne
            break;
        
          case "Cita Clinicas Dentales":
            StepTwo
            break;
        
          default:
            null
            break;
        }
      })
    })
  }
  return (
    <section>

      <div className="flex gap-6">
        <div className="flex flex-col gap-6">
          <h1 className="font-texts font-bold text-5 leading-6">{ title }</h1>
          <p className="font-texts font-normal text-3.5 leading-4">{ subtitle }</p>
        </div>
        <div className="w-p:hidden">
          <Image classNamesImg="w-full h-full object-cover" classNames="w-28 h-28 rounded-full overflow-hidden" src={image.src} alt={image.alt} />
        </div>
      </div>
      <div className="flex align-middle items-center mt-8 mb-6">
        <p className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1">{ privacyPolicy.text }</p>
        <Link href={ privacyPolicy.file.data.attributes.url } passHref target={"_blank"}>
          <p className="text-3.5 font-texts font-normal text-sm text-surface-800 underline">{ privacyPolicy.linkText }</p>
        </Link>
      </div>
      { showProgress && <div className="mb-6">
          <ProgressBar data={{ progress: 30 }} />
        </div>
      }
       <div className="mt-6">
       <Button darkOutlined={button.variant === "outlined_negative"} dark={button.variant === "primary"} data={{
          title: button?.label,
          type: button?.variant,
          icon: button?.iconName,
          isExpand: false,
        }}
          onClick={() => {handleSubmit}}
        />
        </div>
    </section>
  );
}

export default ContainerForm