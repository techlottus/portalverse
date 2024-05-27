import router from "next/router";
import Container from "@/layouts/Container.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import Aspect from "@/components/Aspect";
import cn from "classnames";
import Button from "@/old-components/Button/Button";

type AtrProgramInfoProps = {
  checkoutUrl?: string;
  level?: string;
  modality?: string;
  hideCards?: boolean;
};

const AtrProgramInfo = (props: AtrProgramInfoProps) => {
  const {
    checkoutUrl,
    level,
    modality,
    hideCards
  } = props;

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {
        modality != "a tu ritmo" || level != "Educación Continua" || "Extensión Universitaria"
          ?
          <ContentFullLayout classNames={cn("bg-primary-0", { "hidden": hideCards })} >
            <Container classNames="">
              <div className="flex flex-col justify-center items-center gap-6 py-8 md:p-12">
                <div className="flex flex-col gap-1 justify-center items-center">
                  <span className="font-headings font-bold text-surface-900 text-6 leading-8">Nuestros planes</span>
                  <span className="font-texts font-normal text-surface-500 text-base leading-5">Empieza a estudiar hoy mismo</span>
                </div>
                <div className="flex flex-col md:flex-row items-center md:justify-center gap-6 md:gap-8">
                  <div className="gap-y-4 grid rounded-lg border border-surface-200 p-4 bg-white w-64 h-64 mobile:mx-auto">
                    <div>
                      <p className="font-headings text-lg font-bold">Plan Mensual</p>
                      <p className="font-texts text-xs font-semibold">Colegiatura fija toda tu carrera</p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="grid gap-y-1">
                        <div className="flex items-center">
                          <span className="material-symbols-outlined !text-xs text-success-400 me-2">check_circle</span><p className="font-texts text-xs font-semibold">Aprendizaje autogestivo</p>
                        </div>
                        <div className="flex items-center">
                          <span className="material-symbols-outlined !text-xs text-success-400 me-2">check_circle</span><p className="font-texts text-xs font-semibold">Título con Validez Oficial (SEP)</p>
                        </div>
                        <div className="flex items-center">
                          <span className="material-symbols-outlined !text-xs text-success-400 me-2">check_circle</span><p className="font-texts text-xs font-semibold">Concluye en menos tiempo</p>
                        </div>
                        <div className="flex items-center">
                          <span className="material-symbols-outlined !text-xs text-success-400 me-2">check_circle</span><p className="font-texts text-xs font-semibold">2 años mínimo</p>
                        </div>
                      </div>
                    </div>

                    <div className=" flex justify-center flex-col">
                      <p className="font-headings font-bold text-xl">$399 MXN <span className="text-surface-500 font-normal text-sm">/por mes</span></p>
                    </div>
                    <div className="flex items-end">
                    </div>
                  </div>
                  <div className="gap-y-4 grid rounded-lg border border-surface-200 p-4 bg-white w-64 h-64 mobile:mx-auto relative opacity-40">
                    {/* 
                    <div className="w-28 p-1 bg-primary-400 rounded-full absolute top-[-12px] right-[70px]">
                      <p className="text-center text-white text-xs font-bold">MÁS POPULAR</p>
                    </div> 
                    */}
                    <div>
                      <p className="font-headings text-lg font-bold">Plan Anual</p>
                      <p className="font-texts text-xs font-semibold">Un solo pago cada año</p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="grid gap-y-1">
                        <div className="flex items-center">
                          <span className="material-symbols-outlined !text-xs text-success-400 me-2">check_circle</span><p className="font-texts text-xs font-semibold">Aprendizaje autogestivo</p>
                        </div>
                        <div className="flex items-center">
                          <span className="material-symbols-outlined !text-xs text-success-400 me-2">check_circle</span><p className="font-texts text-xs font-semibold">Título con Validez Oficial (SEP)</p>
                        </div>
                        <div className="flex items-center">
                          <span className="material-symbols-outlined !text-xs text-success-400 me-2">check_circle</span><p className="font-texts text-xs font-semibold">Concluye en menos tiempo</p>
                        </div>
                        <div className="flex items-center">
                          <span className="material-symbols-outlined !text-xs text-success-400 me-2">check_circle</span><p className="font-texts text-xs font-semibold">2 años mínimo</p>
                        </div>

                      </div>
                    </div>

                    <div className=" flex justify-center flex-col">
                      {/* 
                      <div className="bg-secondary-500 rounded-2xl px-3 py-1 max-w-21 mb-1">
                        <p className="text-white font-normal text-xs">50% Dcto.</p>
                      </div> 
                      */}
                      {/* 
                      <p className="font-headings font-bold text-xl">$849 MXN <span className="line-through text-surface-500 font-normal text-sm">$699</span></p> 
                      */}
                      <p className="font-headings font-bold text-xl">Próximamente</p>
                    </div>
                    <div className="flex items-end">
                    </div>
                  </div>
                </div>
                <div className="col-span-12 text-center text-sm font-sm mobile:text-left">
                  <p><strong>Nota importante:</strong> Al adquirir uno de nuestros planes, te suscribirás automáticamente a través de tu método de pago seleccionado. La suscripción se renovará de acuerdo con el plan elegido (mensual o anual). Puedes cancelar en cualquier momento antes de la renovación.</p>
                </div>
              </div>
            </Container>
          </ContentFullLayout>
          : null
      }

      <Container>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex flex-col gap-6 w-full md:w-1/2 lg:mt-10">
            <h4 className="font-headings font-bold text-8 md:text-10 leading-10 md:leading-12">Conoce el Aula Virtual</h4>
            <p className="font-texts font-normal text-base leading-5">
              Formar profesionales de calidad, con base en los conocimientos óptimos de su disciplina, compromiso y perseverancia; para responder a las necesidades de la sociedad y del ámbito laboral.<br />
              La prospectiva de la Universidad Tres Culturas (UTC) al 2025 se enfoca en ampliar su matrícula y cobertura, con lo cual; la sociedad mexicana, cuente con una opción de educación superior de calidad a costos accesibles y un modelo educativo propio, para que los egresados impacten de forma efectiva
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Aspect ratio={"4/3"}>
              <iframe className="rounded-lg" src="https://www.youtube.com/embed/_o5MbFaL7AM?si=MR-AkpRPVaNDpDH_" width="100%" height="320" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </Aspect>
          </div>
        </div>
      </Container>
      <ContentFullLayout classNames="bg-primary-0 mt-10 md:-mt-8 lg:-mt-28 bg-center bg-no-repeat bg-cover bg-[url('https://assets.staging.bedu.org/UTC/titulo_banner_mobile_0bd62788e4.png')] md:bg-[url('https://assets.staging.bedu.org/UTC/titulo_background_desk_06a400d611.jpg')]">
        <Container classNames="">
          <div className="flex flex-col justify-center items-center gap-6 py-8 md:p-12">
            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="font-headings font-bold text-surface-900 text-6 leading-8 text-center">Obtén tu <span className="text-primary-400">título profesional</span></p>
              <span className="font-texts font-normal text-surface-500 text-base leading-5 text-center">Título válido por la Secretaría de Educación Pública (SEP)</span>
            </div>
            <div className="flex flex-col md:flex-row items-center md:justify-center gap-6 md:gap-8">
              <img src="https://assets.staging.bedu.org/UTC/certificado_con_foto_643f7c107b.png" alt="A tu ritmo" className="select-none" />
            </div>
          </div>
        </Container>
      </ContentFullLayout>
    </div >
  );
};

export default AtrProgramInfo;