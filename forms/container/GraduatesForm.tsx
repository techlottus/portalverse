import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/old-components/Button/Button";
import Image from "@/old-components/Image";
import Input from "@/old-components/Input/Input";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useToken from "@/utils/forms/graduates/hooks/useToken";
import useEnrollmentIdValidation from "@/utils/forms/graduates/hooks/useEnrollmentIdValidation";
import useGraduateRegistration from "@/utils/forms/graduates/hooks/useGraduateRegistration";
import { FormSchema } from "@/utils/forms/graduates/schema";
import GRADUATES_FORM_COPIES from "@/forms/fixtures/graduates";
import errors from "@/multitenant-errors";
import cn from "classnames";
import type { FormValues } from "@/utils/forms/graduates/schema";

const GraduatesForm = () => {
  const router = useRouter();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const {
    data: tokenData,
    isLoading: isLoadingToken,
    isError: isErrorToken,
    getTokenData,
  } = useToken();
  const token = tokenData?.token;

  const {
    data: enrollmentIdValidationData,
    isLoading: isLoadingEnrollmentIdValidation,
    isError: isErrorEnrollmentIdValidation,
    validateEnrollmentId,
  } = useEnrollmentIdValidation();
  const isValidEnrollmentId = !!enrollmentIdValidationData?.isValid;

  const {
    isLoading: isLoadingGraduateRegistration,
    isError: isErrorGraduateRegistration,
    sendGraduateRegistrationData,
  } = useGraduateRegistration();

  const isLoading =
    isLoadingToken ||
    isLoadingEnrollmentIdValidation ||
    isLoadingGraduateRegistration;
    
  const isError =
    isErrorToken ||
    isErrorEnrollmentIdValidation ||
    isErrorGraduateRegistration;

  const methods = useForm<FormValues>({
    mode: "all",
    resolver: yupResolver(FormSchema),
    defaultValues: {
      enrollmentId: "",
      email: "",
      phone: "",
      company: ""
    },
  });

  const { watch, trigger } = methods;
  const values = watch();
  const enrollmentId = watch("enrollmentId");

  const goNextStep = () => {
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const validateStep = async () => {
    switch (currentStepIndex) {
      case 0: { // Step One
        const isValidStep = await trigger("enrollmentId");

        if (!isValidStep) return;

        const tokenData = await getTokenData();
        const token = tokenData?.token;

        if (!token) return;

        await validateEnrollmentId(token, enrollmentId);
        
        /**
         * Go to the next step regardless of the enrollment id validation result. Next step renders conditionally
         * depending on the validation result.
         */
        goNextStep();

        break;
      }
      case 1: { // Step Two
        const isValidStep = await trigger();

        if (!isValidStep) return;

        const graduateRegistrationData = await sendGraduateRegistrationData(token, values);
        const isSuccessfulRegistration = !!graduateRegistrationData?.isSuccessful;

        if (!isSuccessfulRegistration) return;

        router?.push("/thank-you?type=egresados");
        break;
      }
      default:
        return;
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-15 bg-white relative">
      {isLoading && (
        <div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0">
          <Image
            src="/images/loader.gif"
            alt="loader"
            classNames={cn("w-10 h-10 top-0 left-0")}
          />
        </div>
      )}
      {isError ? (
        <div className="bg-white w-full h-full p-4 z-10 flex flex-col space-y-6 justify-center items-center left-0 top-0">
          <div
            style={{ maxWidth: "24rem" }}
            className="w-full flex justify-center"
          >
            <img src={errors["404"].image} alt="error" />
          </div>
          <div className="text-center">
            <h1>Ha ocurrido un error al procesar tu información</h1>
            <p>Lamentamos el inconveniente y te pedimos intentarlo de nuevo</p>
          </div>
          <Button
            dark
            onClick={() => location.reload()}
            data={{ title: "Reintentar" }}
          />
        </div>
      ) : (
        <div>
          <FormProvider {...methods}>
            {currentStepIndex === 0 && <StepOne validateStep={validateStep} />}
            {currentStepIndex === 1 && (
              <StepTwo
                validateStep={validateStep}
                isValidEnrollmentId={isValidEnrollmentId}
              />
            )}
          </FormProvider>
        </div>
      )}
    </div>
  );
};

const StepOne = ({ validateStep }: { validateStep: () => Promise<void> }) => {
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <div className="flex flex-col space-y-6">
      <p className="font-headings text-5 font-semibold leading-7">
        Descubre y disfruta los servicios y eventos creados para nuestra
        comunidad de egresados.
      </p>
      <p className="font-texts font-normal text-base leading-5">
        Actualiza tus datos y únete a nuestra comunidad de egresados.
      </p>
      <div>
        <Controller
          name="enrollmentId"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              errorMessage={errors?.enrollmentId?.message?.toString()}
              hasError={!!errors?.enrollmentId?.message}
              value={value}
              data={{
                alphanumeric: true,
                disabled: false,
                iconLeft: "how_to_reg",
                label: "Ingresa tu matrícula",
                name: "enrollmentId",
                onPaste: true,
                type: "text",
                typeButton: "classic",
              }}
              eventKeyPress={(e: CustomEvent) => {
                const value = e?.detail?.value;
                onChange(value);
              }}
            />
          )}
        />
      </div>
      <div className="font-texts font-normal text-base leading-5">
        <p dangerouslySetInnerHTML={{__html: GRADUATES_FORM_COPIES?.message}}></p>
      </div>
      <div>
        <Button
          dark
          onClick={validateStep}
          data={{
            size: "small",
            title: "Consultar",
            type: "primary",
          }}
        />
      </div>
    </div>
  );
};

const StepTwo = ({
  validateStep,
  isValidEnrollmentId,
}: {
  validateStep: () => Promise<void>;
  isValidEnrollmentId: boolean;
}) => {

  const methods = useFormContext();
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const enrollmentId = watch("enrollmentId");
  const isWorking = watch("isWorking");

  useEffect(() => {
    if(!isWorking) {
      setValue("company", "");
    }
  }, [isWorking]);

  return (
    <div>
      {isValidEnrollmentId ? (
        <div className="flex flex-col space-y-6">
          <p className="font-headings text-5 font-semibold leading-7">
            Descubre y disfruta los servicios y eventos creados para nuestra
            comunidad de egresados.
          </p>
          <p className="font-texts font-normal text-base leading-5">
            Revisa que tu matrícula sea la correcta y actualiza tus datos a
            continuación
          </p>
          <p className="font-texts font-normal text-xs leading-3 text-SC/Blackandgrey/B-60 p-3 border rounded-lg">
            Matrícula: {enrollmentId}
          </p>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  data={{
                    alphabetical: false,
                    alphanumeric: false,
                    disabled: false,
                    iconLeft: "mail",
                    label: "Correo electrónico personal",
                    maxlength: "",
                    name: "email",
                    onPaste: true,
                    onlyNumbers: false,
                    pattern: "",
                    placeholder: "",
                    test: "email",
                    type: "text",
                    typeButton: "classic",
                    upperCase: false,
                  }}
                  errorMessage={errors?.email?.message?.toString()}
                  hasError={!!errors?.email?.message}
                  eventKeyPress={(e: CustomEvent) => {
                    onChange(e?.detail?.value);
                  }}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="phone"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value?.toString()}
                  data={{
                    iconLeft: "phone",
                    label: "Teléfono",
                    name: "phone",
                    onPaste: true,
                    onlyNumbers: true,
                    test: "phone",
                    type: "text",
                    typeButton: "classic",
                    maxlength: "10"
                  }}
                  errorMessage={errors?.phone?.message?.toString()}
                  hasError={!!errors?.phone?.message}
                  // eventFocus={() => handleTouchedControl("phone")}
                  eventKeyPress={(e: CustomEvent) => {
                    onChange(e?.detail?.value);
                  }}
                />
              )}
            />
          </div>
          <div>
            <p className="font-texts font-normal text-base leading-5 mb-4">
              ¿Estás trabajando actualmente?
            </p>
            <div className="flex space-x-6">
              <Controller
                name="isWorking"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <span className="flex items-center space-x-2">
                      <span className="font-texts font-normal text-base leading-5">
                        Si
                      </span>
                      <input
                        className="w-6 h-6"
                        onChange={() => onChange(true)}
                        onBlur={onBlur}
                        type="radio"
                        checked={typeof value === "undefined" ? false : value}
                      />
                    </span>
                    <span className="flex items-center space-x-2">
                      <span className="font-texts font-normal text-base leading-5">
                        No
                      </span>
                      <input
                        className="w-6 h-6"
                        onChange={() => onChange(false)}
                        onBlur={onBlur}
                        type="radio"
                        checked={typeof value === "undefined" ? false : !value}
                      />
                    </span>
                  </>
                )}
              />
            </div>
            {errors?.isWorking?.message && (
              <span className="inline-block font-texts text-xs text-[#E57565] font-bold pl-3 text-red mt-3.5">
                Campo requerido
              </span>
            )}
          </div>
          <div
            style={{ height: isWorking ? "76px" : "0px" }}
            className={cn("transition-all overflow-hidden")}
          >
            <Controller
              name="company"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  data={{
                    alphanumeric: true,
                    autocomplete: "off",
                    iconLeft: "mail",
                    label: "Empresa para la que trabajas",
                    name: "company",
                    onPaste: true,
                    type: "text",
                    typeButton: "classic",
                  }}
                  errorMessage={errors?.company?.message?.toString()}
                  hasError={!!errors?.company?.message}
                  // eventFocus={() => handleTouchedControl("email")}
                  eventKeyPress={(e: CustomEvent) => {
                    onChange(e?.detail?.value);
                  }}
                />
              )}
            />
          </div>
          <div>
            <Button
              dark
              onClick={validateStep}
              data={{
                size: "small",
                title: "Enviar datos",
                type: "primary",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
          <p className="font-headings text-5 font-semibold leading-7">
            Matrícula no encontrada
          </p>
          <p className="font-texts font-normal text-xs leading-3 text-SC/Blackandgrey/B-60 p-3 border rounded-lg">
            No encontramos la matrícula: {enrollmentId}
          </p>
          <div className="font-texts font-normal text-base leading-5">
            <p dangerouslySetInnerHTML={{__html: GRADUATES_FORM_COPIES?.enrollmentIdNotFoundMessage}}></p>
          </div>
          <div>
            <Button
              dark
              onClick={() => location.reload()}
              data={{
                size: "small",
                title: "Volver a intentar",
                type: "primary",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GraduatesForm;