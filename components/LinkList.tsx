import { FC, memo } from "react";
import cn from "classnames";
import type { LinkListData } from "@/types/LinkList.types";
import { LinkListSection } from "@/utils/strapi/sections/LinkList";

const LinkList: FC<LinkListSection> = memo(({ title, links }: LinkListSection) => {

  return (
    <section>
      {
        links?.map((content: any, i: number) => <section className="flex mb-4 items-center align-middle" key={`section-oferta-${i}`}>
          <span className={cn({ "order-2": content?.iconPosition === "right" }, "material-icons")}>{content?.iconName}</span>
          <a className=" font-normal" href={content?.href} target={content?.target}>{content?.text}</a>
        </section>)
      }
    </section>
  );
})

export default LinkList