import { FC } from "react";
import cn from "classnames";
import Button from "@/old-components/Button/Button";
import { useRouter } from "next/router";
import { FaqImageSection } from "@/utils/strapi/sections/FaqImage";
import FAQ from "./sections/FAQ";

const FaqImage: FC<FaqImageSection> = (props: FaqImageSection) => {
  const {
    title,
    image,
    imgPosition,
    faq,
    button
  } = props;

  const router = useRouter();

  return (
    <section id="faq-image-section" className="desktop:px-6  mobile:mx-0">
      <h2 id="faq-image-title" className="font-headings font-bold leading-tight text-10 tablet:text-6 mobile:text-6 mobile:px-6 tablet:px-6 mb-6">
        {title}
      </h2>
      <div id="faq-image-content" className="flex-col space-y-10">
        <div className={ cn( "flex mobile:flex-col tablet:flex-col ",{ ["flex-row-reverse "]: imgPosition=="right" } ) }>
          <div className={ cn( "tablet:hidden mobile:hidden desktop:w-1/2" ) }>
            <img className="w-full" src={image?.data?.attributes?.url} />
          </div>
          <div className={ cn( "desktop:w-1/2",{ ["ml-6"]: imgPosition=="left", ["mr-6"]: imgPosition=="right" } ) }>
            {faq && <FAQ {...faq} />}
          </div>
        </div>
        <div className="flex justify-center">
          {button && <Button data={button} onClick={ () => { router.push(button.CTA) } } /> }
        </div>
      </div>
    </section>
  )
}

export default FaqImage