import router from "next/router";
import Container from "@/layouts/Container.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import Aspect from "@/components/Aspect";
import cn from "classnames";
import Button from "@/old-components/Button/Button";

type AtrProgramInfoProps = {
  checkoutUrl?: string;
};

const AtrProgramInfo = (props: AtrProgramInfoProps) => {
  const {
    checkoutUrl,
  } = props;
  
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <ContentFullLayout classNames="bg-primary-0">
        <Container classNames="">
          <div className="flex flex-col justify-center items-center gap-6 py-8 md:p-12">
            <div className="flex flex-col gap-1 justify-center items-center">
              <span className="font-headings font-bold text-surface-900 text-6 leading-8">Nuestros planes</span>
              <span className="font-texts font-normal text-surface-500 text-base leading-5">Empieza a estudiar hoy mismo</span>
            </div>
            <div className="flex flex-col md:flex-row items-center md:justify-center gap-6 md:gap-8">
              <BenefitCard
                title="Plan Mensual"
                subtitle="Colegiatura fija toda tu carrera"
                checkoutUrl={checkoutUrl}
                price="399"
                period="mes"
                priceText="Colegiatura fija toda tu carrera"
              />
              <BenefitCard
                title="Plan Anual"
                subtitle="Un solo pago cada año"
                checkoutUrl={checkoutUrl}
                price="Próximamente"
                period="por año"
                priceIcon="fiber_new"
                priceText="Oferta de lanzamiento"
                hidePriceElements
                disabled
              />
            </div>
          </div>
        </Container>
      </ContentFullLayout>
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
    </div>
  );
};

const BenefitCard = (props: {
  title: string,
  subtitle: string,
  price: string,
  period: string,
  priceText: string,
  checkoutUrl?: string,
  disabled?: boolean,
  hidePriceElements?: boolean,
  priceIcon?: string,
}) => {
  const {
    title,
    subtitle,
    checkoutUrl = null,
    price,
    period = "mes",
    priceText = "",
    priceIcon = "school",
    disabled = false,
    hidePriceElements = false
  } = props;

  return (
    <div className={cn("bg-white flex flex-col gap-5 rounded-xl px-6 py-5 shadow-lg", { "select-none opacity-20": disabled })}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          <span className="font-headings font-bold text-6 leading-7 text-primary-400">{title}</span>
          <span className="font-texts font-normal text-base leading-5 text-surface-500">{subtitle}</span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-texts font-bold text-sm text-surface-900">Beneficios:</p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined !text-4.5 text-primary-400 select-none">book_2</span>
              <span className="font-texts font-normal text-sm text-surface-900">Aprendizaje autogestivo</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined !text-4.5 text-primary-400 select-none">card_membership</span>
              <span className="font-texts font-normal text-sm text-surface-900">Título con Validez Oficial (SEP)</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined !text-4.5 text-primary-400 select-none">schedule</span>
              <span className="font-texts font-normal text-sm text-surface-900">Concluye en menos tiempo</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined !text-4.5 text-primary-400 select-none">savings</span>
              <span className="font-texts font-normal text-sm text-surface-900">Único pago por suscripción mensual </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="material-symbols-outlined !text-4.5 text-primary-400 select-none">school</span>
              <span className="font-texts font-normal text-sm text-surface-900">2 años mínimo</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-row items-end gap-1">
            {
              hidePriceElements ?
                <span className="font-headings font-bold text-6 leading-7 text-surface-900">{price}</span>
              :
              <>
                <span className="font-headings font-bold text-6 leading-7 text-surface-900">${price} MXN</span>
                <span className="font-texts font-normal !text-4.5 text-surface-800">/{period}</span>
              </>
            }
          </div>
          <div className="flex flex-row items-center gap-1.5">
            {
              priceIcon ?
                <span className={cn("material-symbols-outlined !text-4.5 text-secondary-400 select-none", { "text-surface-900": disabled })}>{priceIcon}</span>
              : null
            }
            <span className={cn("font-texts font-normal text-secondary-400", { "text-surface-900": disabled })}>{priceText}</span>
          </div>
        </div>
      </div>
      {
        checkoutUrl ?
          <Button
            dark
            data={{
              "title": "Inscribirme",
              "type": "outlined",
              "icon": "shopping_cart",
              "isExpand": true,
              "disabled": !!disabled
            }}
            onClick={() => {
              if (!disabled) {
                router?.push(checkoutUrl)
              }
            }}
          />
          : null
      }
    </div>
  );
};

export default AtrProgramInfo;