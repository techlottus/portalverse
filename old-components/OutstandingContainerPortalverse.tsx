import { FC, useEffect } from "react"
import OustandingModule from "@/old-components/OutstandingModule/OustandingModule"
import type OutstandingContainerPortalverseComponentData from "@/types/OutstandingContainerPortalverse.types";

const OutstandingContainer: FC<OutstandingContainerPortalverseComponentData> = ({ items, reverse = false }: OutstandingContainerPortalverseComponentData) => {
  useEffect(() => {
    const cards = Array.prototype.slice.call(document.querySelectorAll("lottus-outstanding-module-portalverse"));

    cards?.forEach(card => {
      const cardContainer = card?.children?.[0];

      const titleContainer = cardContainer?.children?.[0]?.children[0];

      const textContainer = cardContainer?.children?.[0]?.children?.[1];

      if (textContainer) {
        textContainer.classList.add("overflow-y-visible", `${items?.[0]?.contentVariant === "light" ? "!text-black" : "!text-white"}`)
      }

      if (titleContainer) {
        titleContainer.classList.add(`${items?.[0]?.contentVariant === "light" ? "!text-black" : "!text-white"}`)
      }

      if (cardContainer) {
        cardContainer.classList.add("h-full", "flex", "flex-col", "justify-between")
      }
    })
  }, []);

  return (
    <section className="flex flex-col w-t:grid w-t:gap-6 w-t:grid-cols-2 w-t:grid-rows-2 w-p:grid-cols-1 w-p:grid-rows-1 w-p:gap-6">
      {
        items?.map((item: any, i: number) => (
          <article key={`outstanding-module-${i}`} className="justify-self-stretch overflow-hidden pt-4 pb-9 border-b-4 border-primary-100">
            {
              reverse ?
              <OustandingModule
                data={{ ...item, direction: i % 2 === 0 ? 'left' : 'right' }}
              />
              : 
              <OustandingModule
                data={{ ...item, direction: i % 2 === 0 ? 'right' : 'left' }}
              />
            }
          </article>
        )
        )
      }
    </section>
  )
}

export default OutstandingContainer
