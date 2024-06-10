import cn from "classnames";
import { StrapiImage } from "@/types/strapi/common";
import { useRouter } from "next/router";
import Button from "@/old-components/Button/Button";

export type PaymentCardData = {
  id?:string;
  program?:number;
  title?: string;
  subtitle?: string;
  perks?: Array<any>;
  discount?: number;
  checkout_url?: string;
  price?: number;
  discounted_price?: number;
  total_payment?: number;
  periodicity?: string;
  featured_price?: boolean;
  payment_provider_image?: StrapiImage;
  metadata?:any;
  config?:any;
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
    periodicity,
    featured_price,
    payment_provider_image, metadata, config} = props;

  const router = useRouter();
  
  return (
    <div className={cn("keen-slider__slide gap-y-4 grid rounded-lg border border-surface-200 p-4 bg-white w-72 h-72 mobile:mx-auto", { "opacity-40": !checkout_url, "!border-primary-400": featured_price })}>
      <div>
        {
          featured_price
            ? <div className="w-28 p-1 bg-primary-400 rounded-full absolute top-2 right-2">
              <p className="text-center text-white text-xs font-bold">MÁS POPULAR</p>
            </div>
            : null
        }
        {
          payment_provider_image
            ? <img className="w-11 mb-1 rounded-md" src={payment_provider_image?.data?.attributes?.url} alt="" />
            : null
        }
        {
          payment_provider_image
            ? <p className="font-headings text-lg font-bold">{title}</p>
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
            ? <div className="bg-secondary-500 rounded-2xl px-3 py-1 max-w-21 mb-1">
              <p className="text-white font-normal text-xs">{discount}% Dcto.</p>
            </div>
            : null
        }
        {
          price && !discounted_price
            ? <p className="font-headings font-bold text-xl">${price.toLocaleString('en-US')} MXN <span className="text-surface-500 font-normal text-sm">{periodicity}</span></p>
            : null
        }
        {
          discounted_price
            ? <p className="font-headings font-bold text-xl">${discounted_price.toLocaleString('en-US')} MXN <span className="line-through text-surface-500 font-normal text-sm">${price}</span></p>
            : null
        }
        {
          total_payment
            ? <p className="font-normal text-xs text-surface-500">Pago total: ${total_payment.toLocaleString('en-US')}</p>
            : null
        }
      </div>
      {/* {
        checkout_url
          ? <div className="flex items-end justify-center">
            <Button
              dark
              data={{
                type: "primary",
                title: "Inscribirme ahora",
                isExpand: true,
                disabled: !checkout_url
              }}
              onClick={() => {
                if (checkout_url) {
                  router.push(checkout_url);
                } else {
                  return
                }
              }}
            />
          </div>
          :  metadata && config ?<div className="flex items-end justify-center">
          <Button
            dark
            data={{
              type: "primary",
              title: "Inscribirme ahora",
              isExpand: true,
            }}
            onClick={() => {
              if (checkout_url) {
                router.push(`/checkout/${program}/${id}`);
              } else {
                return
              }
            }}
          />
        </div>:  <div className="flex items-center">
            <p className="text-6 font-bold">Próximamente</p> */}
          {/* </div> }*/}
        <div className="flex items-end justify-center">
        <Button
          dark
          data={{
            type: "primary",
            title: "Inscribirme ahora",
            isExpand: true,
          }}
          onClick={() => {
              router.push(`/checkout/${program}/${id}`);
          }}
        />
      </div>
    </div>
  )

};
export default PaymentCard;
