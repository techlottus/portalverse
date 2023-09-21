import { FC, useEffect, useState } from "react"
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
import DentalClinics from "@/forms/container/DentalClinics";
import Container from "@/layouts/Container.layout";


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
  title?: string;
  description?: string;
  subtitle?: string;
  privacyPolicy?: privacyPolicy;
  form: string;
  image?: any;
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

  const { title, subtitle, privacyPolicy, image, description, showProgress, button, form } = props
  // const [ progress, setProgress ] = useState<number>(0);

  // useEffect(() => {
  //   setProgress(step);
  // }, [step]);

  
  const getForm = () => {
    switch (form) {
      case "Clinicas Dentales":
        return <DentalClinics button={button} />;
      default:
        return <Step button={button} />;
    }

    
  }
  return (
    <section>
      <Container>
        <div className="grid grid-cols-12-gap w-t:grid-cols-8-gap w-p:grid-cols-4-gap gap-grid-gap">
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
            <section className="p-6 shadow-15 bg-surface-0 relative" >
              <section>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-6">
                    { title && <h1 className="font-texts font-bold text-5 leading-6">{ title }</h1> }
                    { subtitle && <p className="font-texts font-normal text-3.5 leading-4">{ subtitle }</p> }
                  </div>
                  {
                    image && <div className="w-p:hidden">
                      <Image classNamesImg="w-full h-full object-cover" classNames="w-28 h-28 rounded-full overflow-hidden" src={image.src} alt={image.alt} />
                    </div>
                  }
                </div>
                {
                  !!privacyPolicy && <div className="flex align-middle items-center mt-8 mb-6">
                    <p className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1">{ privacyPolicy.text }</p>
                    <Link href={ privacyPolicy.file.data.attributes.url } passHref target={"_blank"}>
                      <p className="text-3.5 font-texts font-normal text-sm text-surface-800 underline">{ privacyPolicy.linkText }</p>
                    </Link>
                  </div>
                }
                { 
                  showProgress && <div className="mb-6">
                    <ProgressBar data={{ progress: 30 }} />
                  </div>
                }
                <form action="">
                  <>
                    {
                      getForm()
                    }
                  </>
                </form>
              </section>
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContainerForm