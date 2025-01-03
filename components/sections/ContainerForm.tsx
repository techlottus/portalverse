import { FC, useEffect, useState } from "react"
import Link from "next/link";
import ProgressBar from "@/old-components/ProgressBar/ProgressBar";
import Image from "@/old-components/Image"
import DentalClinics from "@/forms/container/DentalClinics";
import { ContainerForm as ContainerFormType } from "@/utils/strapi/sections/ContainerForm";
import WebError, { WebErrorComponent } from "./WebError";
import cn from "classnames";
import Button from "@/old-components/Button/Button";
import { useRouter } from "next/router";
import ProgramDetailForm from "@/forms/container/ProgramDetailForm";
import { DoubleDegreeForm } from "@/forms/container/DoubleDegreeForm";
import ScheduleVisitForm from "@/forms/container/ScheduleVisitForm";
import { ProgramPageForm } from "@/forms/container/ProgramPageForm";
import BeWanted from "@/forms/container/BeWanted";
import OpenFormInit from "@/forms/fixtures/openform"

const ContainerForm: FC<ContainerFormType> = (props: ContainerFormType) => {
  const router = useRouter()

  const {
    title,
    privacyPolicy,
    image,
    description,
    progress = 30,
    button,
    form,
    errors,
    position,
    width,
    prefilledData,
    options,
    shadow
  } = props
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentError, setCurrentError] = useState<WebErrorComponent | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const errorData = errors?.reduce((acc, curr) => { if (curr.errorCode === error) acc = curr; return acc }, {}) || {}
    setCurrentError(errorData)
  }, [error]);
  useEffect(() => {
    if (isSuccess) router.push('/thank-you')
  }, [isSuccess]);

  const setStatus = ({ loading, error, valid, success }: { loading: boolean, error: string, valid: boolean, success: boolean }) => {
    setIsVisible(!loading && !error)
    setIsLoading(loading)
    setError(error)
    setIsValid(valid)
    setIsSuccess(success)
  }

  const getForm = () => {
    switch (form) {
      case "Clinicas_Dentales":
        return <DentalClinics submit={submit} setStatus={setStatus} />;
      case "Detalle_de_programa":
        return <ProgramDetailForm prefilledData={prefilledData} options={options} submit={submit} setStatus={setStatus} />;
      case "Doble_Titulacion":
        return <DoubleDegreeForm prefilledData={prefilledData} options={options} submit={submit} setStatus={setStatus} />;
      /*  case "Acreditate":
         return <AcreditatForm prefilledData={prefilledData} options={options} submit={submit} setStatus={setStatus} />; */
      case "Agendar_visita":
        return <ScheduleVisitForm prefilledData={prefilledData} options={options} submit={submit} setStatus={setStatus} />;
      case "Pagina_programa":
        return <ProgramPageForm prefilledData={prefilledData} options={options} submit={submit} setStatus={setStatus} />;
      case "Empleabilidad":
        return <BeWanted pathBeWanted="https://www.bewanted.com/acceso/candidatos" copies={{ ...OpenFormInit.steponebewanted }} pathThankyou={`/thank-you?type=egresados`} classNames="w-full h-auto bg-surface-0 bottom-0 rounded-lg" />;
      default:
        setError('404')
        return null;
    }
  }
  return (
    <section /* className={cn({ 'hidden': !isVisible })} */>
      <div className={cn('flex', {
        "justify-center": position === 'center',
        "justify-start": position === 'left',
        "justify-end": position === 'right',
      })}>
        <div className={cn('w-p:w-full', {
          "w-12/12": width === 'w_12_12',
          "w-11/12": width === 'w_11_12',
          "w-10/12": width === 'w_10_12',
          "w-9/12": width === 'w_9_12',
          "w-8/12": width === 'w_8_12',
          "w-7/12": width === 'w_7_12',
          "w-6/12": width === 'w_6_12',
          "w-5/12": width === 'w_5_12',
          "w-4/12": width === 'w_4_12',
          "w-3/12": width === 'w_3_12',
          "w-2/12": width === 'w_2_12',
        })}>
          <section className={cn("mobile:p-3 p-6 shadow-15 bg-surface-0 relative rounded-lg", { "shadow-none": shadow == false })}>
            {
              isLoading
                ? <div className="absolute w-full h-full z-20 flex justify-center items-center left-0 top-0 bg-surface-0">
                  <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
                </div>
                : null
            }
            {
              !!error
                ? <WebError {...currentError}></WebError>
                : <section>
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-6">
                      {!!title && <h4 className="font-texts font-bold text-5 leading-6">{title}</h4>}
                      {!!description && <p className="font-texts font-normal text-3.5 leading-4">{description}</p>}
                    </div>
                    {
                      !!image?.data && <div className="w-p:hidden">
                        <Image classNamesImg="w-full h-full object-cover" classNames="w-28 h-28 rounded-full overflow-hidden" src={image.data?.attributes?.url} alt={image.data.attributes.alternativeText || ''} />
                      </div>
                    }
                  </div>
                  {
                    !!privacyPolicy && <div className="flex align-middle items-center mt-8 mb-6 flex-wrap">
                      <p className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1 block text-wrap">{privacyPolicy.text}  <Link href={privacyPolicy.file ? privacyPolicy.file.data.attributes.url : privacyPolicy.href} passHref target={"_blank"}>
                        <span className="text-3.5 font-texts font-normal text-sm text-surface-800 underline text-wrap">{privacyPolicy.linkText}</span>
                      </Link></p>
                     
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
                    !!button &&
                    <>
                      <div className="mt-6 mobile:hidden">
                        <Button darkOutlined={button?.variant === "outlined_negative"} dark={true}
                          data={{
                            title: button?.label,
                            icon: button?.iconName,
                            isExpand: false,
                            disabled: !isValid
                          }}
                          onClick={() => {
                            !!button.action && button.action()()
                            setSubmit(true);
                            setTimeout(() => {
                              setSubmit(false)
                            }, 100);
                          }}
                        />
                      </div>
                      <div className="mt-6 desktop:hidden tablet:hidden">
                        <Button darkOutlined={button?.variant === "outlined_negative"} dark={true}
                          data={{
                            title: button?.label,
                            icon: button?.iconName,
                            isExpand: true,
                            disabled: !isValid
                          }}
                          onClick={() => {
                            !!button.action && button.action()()
                            setSubmit(true);
                            setTimeout(() => {

                              setSubmit(false)
                            }, 100);
                          }}
                        />
                      </div>
                    </>
                  }
                </section>

            }
          </section>
        </div>
      </div>
    </section>
  );
}

export default ContainerForm






