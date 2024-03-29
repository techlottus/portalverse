import { FC, useEffect, useState} from "react"
import Link from "next/link";
import ProgressBar from "@/old-components/ProgressBar/ProgressBar";
import Image from "@/old-components/Image"
import DentalClinics from "@/forms/container/DentalClinics";
import Container from "@/layouts/Container.layout";
import { ContainerForm as ContainerFormType } from "@/utils/strapi/sections/ContainerForm";
import WebError, { WebErrorComponent } from "./WebError";
import cn from "classnames";
import Button from "@/old-components/Button/Button";
import { useRouter } from "next/router";


const ContainerForm: FC<ContainerFormType> = (props: ContainerFormType) => {
  const router = useRouter()
  
  const { title, privacyPolicy, image, description, progress = 30, button, form, errors, position, width } = props
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentError, setCurrentError] = useState<WebErrorComponent | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // for future devolpment of progress managemente, base state to hold progress of form
  // const [ progress, setProgress ] = useState<number>(progress);

  // useEffect(() => {
  //   setProgress(step);
  // }, [step]);
  
  useEffect(() => {
    const errorData = errors.reduce((acc, curr) => { if (curr.errorCode === error) acc = curr; return acc }, {})
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
      default:
        setError('404')
        return null;
    }
  }
  
  return (
    <section >
      <Container>
        <div className={cn('flex', {
          "justify-center" : position === 'center',
          "justify-start" : position === 'left',
          "justify-end" : position === 'right',
        })}>
          <div className={cn('w-p:w-full', {
          "w-12/12" : width === 'w_12_12',
          "w-11/12" : width === 'w_11_12',
          "w-10/12" : width === 'w_10_12',
          "w-9/12" : width === 'w_9_12',
          "w-8/12" : width === 'w_8_12',
          "w-7/12" : width === 'w_7_12',
          "w-6/12" : width === 'w_6_12'
        })}>
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