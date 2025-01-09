import cn from "classnames";
import { StrapiImage } from "@/types/strapi/common";
import { useRouter } from "next/router";
import { Button } from "@lottuseducation/molecules";
import Link from "next/link";

export type PaymentCardData = {
  id?: string | null;
  program?: number | null;
  title?: string;
  subtitle?: string;
  perks?: Array<any>;
  discount?: number;
  checkout_url?: string;
  price?: number;
  discounted_price?: number;
  partiality_price?: number;
  partiality_number?: number;
  total_payment?: number;
  periodicity?: string;
  featured_price?: boolean;
  payment_provider_image?: StrapiImage;
  metadata?: any;
  config?: any;
  disabled?: boolean;
}

const PaymentCard = (props: PaymentCardData) => {

  const {
    id,
    program,
    title,
    subtitle,
    perks = [],
    discount,
    checkout_url,
    price,
    discounted_price,
    total_payment,
    partiality_price,
    partiality_number,
    periodicity,
    featured_price,
    payment_provider_image,
    metadata,
    config,
    disabled
  } = props;

  const router = useRouter();
  
  return (
    <div className={cn("keen-slider__slide gap-y-3 flex flex-col justify-between rounded-lg border border-surface-200 p-4 bg-white w-68 h-72 mobile:mx-auto", { "opacity-40": !checkout_url && (!metadata && !config), "!border-primary-400": featured_price })}>
      <div className="">
        {
          featured_price
            ? <div className="w-28 p-1 mb-1 bg-primary-400 rounded-full">
              <p className="text-center text-white text-xs font-bold">MÁS POPULAR</p>
            </div>
            : null
        }
        {
          title
            ? <h3 className="font-headings mb-1 text-xl font-bold">{title}</h3>
            : null
        }
        {
          subtitle
            ? <p className="font-texts text-xs font-semibold">{subtitle}</p>
            : null
        }
      </div>
      {
        perks?.length > 0
          ? <div className="flex flex-col justify-center">
            <div className="grid gap-y-1">
              {
                perks?.map((perk: any, i: number) => {
                  return (
                    <div className="flex items-center" key={i}>
                      <span className="material-symbols-outlined !text-xs text-success-400 me-2">check_circle</span><p className="font-texts text-xs font-semibold">{perk?.accent}</p>
                    </div>
                  )
                }
                )
              }
            </div>
          </div>
          : null
      }

      <div className=" flex justify-center flex-col">
        {
          discount
            ? <div className="bg-secondary-500 rounded-2xl px-3 py-1 max-w-23 mb-1">
              <p className="text-white font-normal text-xs">Ahorra {discount}%</p>
            </div>
            : null
        }
        
        {
          price && !discounted_price && !periodicity
            ? <p className="font-headings font-bold text-xl">${price.toLocaleString('en-US')} MXN</p>
            : null
        }
        {
          partiality_price && periodicity && !discounted_price
            ? <p className="font-headings font-bold text-xl">${partiality_price.toLocaleString('en-US')} MXN <span className="text-surface-500 font-normal text-xs">{periodicity}</span></p>
            : null
        }
        {
          partiality_price && discounted_price && periodicity
            ? <p className="font-headings font-bold text-xl">${discounted_price.toLocaleString('en-US')} MXN <span className="line-through text-surface-500 font-normal text-xs">${partiality_price}</span> <span className="text-surface-500 font-normal text-xs">{periodicity}</span></p>
            : null
        }
        {
          discounted_price && !partiality_price
            ? <p className="font-headings font-bold text-xl">${discounted_price.toLocaleString('en-US')} MXN <span className="line-through text-surface-500 font-normal text-xs">${price}</span></p>
            : null
        }
        {
          price && partiality_price
            ? <p className="font-normal text-xs text-surface-500">Pago total: ${price?.toLocaleString('en-US')}</p>
            : null
        }

      </div>
       <div className="">
        {
          payment_provider_image?.data?.attributes?.url
            ? <img className="h-6  mb-3" src={payment_provider_image?.data?.attributes?.url} alt="" />
            : null
        }
        {
          checkout_url && !disabled
            ? <Button
                variant="darkOutlined"
                className="p-4 !bg-primary-500 text-surface-0 !text-sm hover:!bg-surface-0 hover:!text-primary-500 w-full"
                color="primary"
              >
                <Link className="no-underline" href={checkout_url}>
                  <p>Inscribirme ahora</p>
                </Link>
              </Button>
            : metadata && config && !disabled
              ? <Button
                  variant="darkOutlined"
                  className="p-4 !bg-primary-500 text-surface-0 !text-sm hover:!bg-surface-0 hover:!text-primary-500 w-full"
                  color="primary"
                  onClick={() => {
                    router.push(`/checkout/${program}/${id}`);
                  }
                  }
                >
                  <p>Inscribirme ahora</p>
                </Button>
              : <div className="flex items-center">
                  <p className="text-xl font-bold m-4">Próximamente</p>
                </div>
        }
      </div>
    </div>
  )
}
export default PaymentCard;