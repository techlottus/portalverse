import { FC, useEffect, useState} from "react"
import Link from "next/link";
import OpenForm from "@/forms/container/OpenForm";
import ProgressBar from "@/old-components/ProgressBar/ProgressBar";
import Image from "@/old-components/Image"
import DentalClinics from "@/forms/container/DentalClinics";
import Container from "@/layouts/Container.layout";
import { ContainerForm as ContainerFormType } from "@/utils/strapi/sections/ContainerForm";
import WebError from "./WebError";
import cn from "classnames";
import Button from "@/old-components/Button/Button";
import { useRouter } from "next/router";
import { WebErrorSection } from "@/utils/strapi/sections/WebError";


const ContainerForm: FC<ContainerFormType> = (props: ContainerFormType) => {
  const router = useRouter()
  
  const { title, privacyPolicy, image, description, progress = 30, button, form, errors } = props
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentError, setCurrentError] = useState<WebErrorSection | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const [ progress, setProgress ] = useState<number>(progress);

  // useEffect(() => {
  //   setProgress(step);
  // }, [step]);
  
  useEffect(() => {
    const errorData = errors.reduce((acc, curr) => { if (curr.error_code === error) acc = curr; return acc }, {})
    setCurrentError(errorData)
  }, [error]);
  useEffect(() => {
    if (isSuccess) router.push('/thank-you')
  }, [isSuccess]);

  const setStatus = ({loading, error, valid, success}: { loading: boolean, error: string, valid: boolean, success: boolean}) => {
    setIsLoading(loading)
    setError(error)
    setIsValid(valid)
    setIsSuccess(success)
  }
  
  const getForm = () => {
    switch (form) {
      case "Clinicas_Dentales":
        return <DentalClinics submit={submit} setStatus={setStatus} />;
        case "OpenForm":
        return <OpenForm image={{src: '', alt: ''}} pathThankyou="" ></OpenForm>;
      default:
        setError('404')
        return null;
    }
  }
  
  return (
    <section>
      <Container>
        <div className="grid grid-cols-12-gap w-t:grid-cols-8-gap w-p:grid-cols-4-gap gap-grid-gap">
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
            <section className="p-6 shadow-15 bg-surface-0 relative" >
              {
                isLoading
                  ? <div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0 bg-surface-0">
                      <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
                    </div>
                  : null
              }
              {
                !!error
                  ? <WebError { ...currentError }></WebError>
                  : <section>
                      <div className="flex gap-6">
                        <div className="flex flex-col gap-6">
                          { !!title && <h1 className="font-texts font-bold text-5 leading-6">{ title }</h1> }
                          { !!description && <p className="font-texts font-normal text-3.5 leading-4">{ description }</p> }
                        </div>
                        {
                          !!image.data && <div className="w-p:hidden">
                            <Image classNamesImg="w-full h-full object-cover" classNames="w-28 h-28 rounded-full overflow-hidden" src={image.data?.attributes?.url} alt={image.data.attributes.alternativeText || ''} />
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
                        (!!progress && progress > 0) && <div className="mb-6">
                          <ProgressBar data={{ progress }} />
                        </div>
                      }
                      <>
                        {
                          getForm()
                        }
                      </>
                      {
                        !!button && <div className="mt-6">
                            <Button darkOutlined={button?.variant === "outlined_negative"} dark={true}
                              data={{
                                title: button?.label,
                                icon: button?.iconName,
                                isExpand: false,
                                disabled: !isValid
                              }}
                              onClick={() => setSubmit(true)}
                            />
                          </div>
                      }
                    </section>
                  
              }
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContainerForm