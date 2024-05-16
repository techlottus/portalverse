import ContentLayout from "@/layouts/Content.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import PaymentCard, { PaymentCardData } from "./PaymentCard";
import cn from 'classnames';


type PriceListData = {
  general_perks: Array<string>
  price: Array<PaymentCardData>
}

export type PaymentCardContainerData = {
  title: string;
  accent_title: string;
  price_list: PriceListData;
  text: string;
}

const PaymentCardSection = (props: PaymentCardContainerData) => {

  const { title, accent_title, price_list, text } = props;  

  return (
    <ContentFullLayout classNames="bg-primary-0 mt-20">
      <ContentLayout>
        <div className="col-span-12 py-12 px-20 mobile:px-4">
          <div className="col-span-12 text-center">
            <p className="font-headings text-2xl font-bold">{title}<span className="text-secondary-500">{accent_title}</span></p>
          </div>
          <div>
            {
              price_list?.general_perks?.length > 0
                ? <div className="flex justify-center items-center gap-2 mt-6">
                  {
                    price_list?.general_perks?.map((perk: any, i: number) => {
                      return (
                        <div className="flex items-center" key={i}>
                          <span className="material-symbols-outlined !text-md text-success-400 me-2">check_circle</span><p className="font-texts text-md font-semibold">{perk?.accent}</p>
                        </div>
                      )
                    }
                    )
                  }
                </div>
                : null
            }
          </div>
          <div className="flex justify-center">
            <div className={cn("grid grid-cols-4 gap-4 my-8 mobile:grid-cols-1", { "!grid-cols-2": price_list?.price?.length === 2, "!grid-cols-3": price_list?.price?.length === 3 })}>
              {
                price_list?.price?.map((price: PaymentCardData, i: any) => {
                  return (
                    <PaymentCard {...price} key={i} />
                  )
                })
              }
            </div>
          </div>
          <div className="col-span-12 text-center text-sm font-sm mobile:text-left">
            {text}
          </div>
        </div>
      </ContentLayout>
    </ContentFullLayout>
  );
}

export default PaymentCardSection