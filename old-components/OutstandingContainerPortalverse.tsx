import { FC, useEffect } from "react"
import OustandingModule from "@/old-components/OutstandingModule/OustandingModule"
import OutstandingContainerPortalverseComponentData from "@/types/OutstandingContainerPortalverse.types";

const OutstandingContainer: FC<OutstandingContainerPortalverseComponentData> = ({ items }: OutstandingContainerPortalverseComponentData) => {

  const updateSize = () => {
    let allItems = [];
    let maxH = 0;
    const cards = Array.prototype.slice.call(document.querySelectorAll("lottus-outstanding-module-portalverse"));
    if (window.outerWidth < 1024) {
      allItems = cards.map((item: any) => {
        const itemH = item.children[0].children[0];
        const { offsetHeight } = itemH as HTMLDivElement;
        return offsetHeight
      });
      maxH = Math.max(...allItems) + 32;
    }
    cards.forEach((item: any) => {
      const itemH = item.children[0].children[0];
      itemH.style.height = window.outerWidth > 1023 || window.outerWidth < 600 ? 'auto' : `${maxH}px`;
    });
  }

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return <section className="flex flex-col w-t:grid w-t:gap-6 w-t:grid-cols-2 w-t:grid-rows-2 w-p:grid-cols-1 w-p:grid-rows-1 w-p:gap-6">
    {
      items.map((item: any, i: number) => <article key={`outstanding-module-${i}`} className="justify-self-stretch"><OustandingModule data={{...item, direction: i % 2 === 0 ? 'right' : 'left' }} /></article>)
    }
  </section>
}

export default OutstandingContainer
