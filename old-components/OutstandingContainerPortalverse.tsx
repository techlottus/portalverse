import { FC, useEffect } from "react"
import OustandingModule from "@/old-components/OutstandingModule/OustandingModule"
import type OutstandingContainerPortalverseComponentData from "@/types/OutstandingContainerPortalverse.types";

const OutstandingContainer: FC<OutstandingContainerPortalverseComponentData> = ({ items }: OutstandingContainerPortalverseComponentData) => {

  useEffect(() => {
    const cards = Array.prototype.slice.call(document.querySelectorAll("lottus-outstanding-module-portalverse"));

    cards?.forEach(card => {
      const cardContainer = card?.children?.[0];

      const textContainer = cardContainer?.children?.[0]?.children?.[1];

      if (textContainer) {
        textContainer.classList.add("overflow-y-visible")
      }

      if(cardContainer) {
        cardContainer.classList.add("h-full", "flex", "flex-col", "justify-between")
      }
    })
  }, []);

  return <section className="flex flex-col w-t:grid w-t:gap-6 w-t:grid-cols-2 w-t:grid-rows-2 w-p:grid-cols-1 w-p:grid-rows-1 w-p:gap-6">
    {
      items?.map((item: any, i: number) => <article key={`outstanding-module-${i}`} className="justify-self-stretch"><OustandingModule data={{...item, direction: i % 2 === 0 ? 'right' : 'left' }} /></article>)
    }
  </section>
}

export default OutstandingContainer
