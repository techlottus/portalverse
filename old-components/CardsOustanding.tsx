import { createRef, FC, memo, useEffect } from "react"
import { CardsOstandingData } from "@/types/CardsOustanding"

const CardsOstanding: FC<CardsOstandingData> = memo(({data}: CardsOstandingData) => {
  const cardsOustandingPortalverseRef = createRef();
  
  useEffect(() => {
    (cardsOustandingPortalverseRef.current as any).data = {
      cards: data.cards.map((card: any) => ({
        image: { ...card.image},
        title: card.title,
        text: card.text,
        backgroundColor: card.backgroundColor,
      })) || [
        {
          image: {
            desktop: '',
            mobile: '',
          },
          title: '',
          text: '',
          backgroundColor: '',
        }
      ],
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-cards-outstanding-portalverse ref={cardsOustandingPortalverseRef}></lottus-cards-outstanding-portalverse>
})

export default CardsOstanding