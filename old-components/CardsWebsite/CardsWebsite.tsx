import { FC, memo, useEffect, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"
import CardWebsite from "@/old-components/CardWebsite"

const CardsWebsite: FC<any> = memo(({ data, classNames, cols = 4 } : any) => {

  const [ allCards, setAllCards ] = useState<Array<any>>([]);
  const router = useRouter();

  useEffect(() => {
    setAllCards([ ...data ]);
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps
    
  return <section className={cn(`col-span-12 grid desktop:grid-cols-4 gap-6 tablet:grid-cols-2 mobile:grid-cols-1`, classNames, {
      "desktop:grid-cols-4": cols === 4,
      "desktop:grid-cols-3": cols === 3,
      "desktop:grid-cols-2": cols === 2
    })}>
      {
        allCards.map((item:any, i:number) => <section key={`section-blog-${i}`}>
         <CardWebsite data={item} />
        </section>)   
      }
    </section>
  }
)

export default CardsWebsite