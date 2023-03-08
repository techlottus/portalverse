import { FC, useEffect, useState } from "react"
import cn from "classnames"
import RichtText from "@/old-components/Richtext/Richtext"
import Image from "@/old-components/Image"
import RainbowComponentConfig, { RainbowItemComponentConfig, RainbowSectionComponentConfig, StyleRainbowSectionAll, StyleRainbowSectionItem } from "@/types/Rainbow.types"

const Rainbow: FC<RainbowComponentConfig> = ({ sections, title, classNamesTitle }: RainbowComponentConfig) => {

  const [ stylesContainer, setStylesContainer ] = useState<StyleRainbowSectionAll>({});
  const [ changeDetect, setChangeDetect ] = useState<number>(0);

  const detectResize = () => {
    setChangeDetect((prevState: number) => prevState + 1);
  }

  useEffect(() => {
    detectResize();
    window.addEventListener('resize', detectResize);
    return () => window.removeEventListener('resize', detectResize);
  }, []);

  useEffect(() => {
    const { outerWidth } = window;
    const allStyles = sections.reduce(( prev: StyleRainbowSectionAll, { color = null, sections: items }: any, i: number ) => {
      return { ...prev, ...items.reduce((p: StyleRainbowSectionAll, { color: colorItem = null }: any, j: number) => {
        let stylesItem: StyleRainbowSectionItem = { "backgroundImage": `linear-gradient(to right, ${!!colorItem ? colorItem : color} 75%, white 70%)` };
        if ( outerWidth < 1024 ) {
          stylesItem = { "backgroundColor": `${!!colorItem ? colorItem : color}` }
        }
        return { ...p, [`${i}-${j}`]: { ...stylesItem } }
      }, {}) }
    }, {});
    setStylesContainer({ ...allStyles });
  }, [changeDetect]);// eslint-disable-line react-hooks/exhaustive-deps

  return <section className="relative w-full">
    <h1 className={cn("mb-6 ac-type-h3-bold-solid-poppins-desktop w-t:ac-type-h2-bold-solid-poppins-mobile w-p:ac-type-h3-bold-solid-poppins-tabmob", classNamesTitle)}>{ title }</h1>
    <div className="hidden absolute w-4 w-t:w-5 w-p:w-2 bg-[#CDCDCD] h-[93%] w-t:h-[95%] w-p:h-[95%] ml-2 w-t:ml-6 w-p:ml-[2px] rounded-[20px] my-[80px]"></div>
    {
      sections.map(( { sections }: RainbowSectionComponentConfig, i: number ) => <section key={`section-container${i}`}>
        {
          sections.map(( { title, description: content, image: { src, alt } }: RainbowItemComponentConfig, j: number ) => <div style={stylesContainer[`${i}-${j}`]} className={cn("flex w-t:flex-col w-p:flex-col gap-6 pt-12")} key={`section-detail${j}`}>
            <div className="pl-[100px] w-p:pl-[32px] w-t gap-6 flex flex-col justify-center grow w-[488px] w-t:w-auto w-p:w-auto w-t:mr-[24px] w-p:mr-[24px]">
              <h3 className="ac-type-h3-bold-solid-poppins-desktop w-t:ac-type-h2-negative-bold-solid-poppins-mobile w-p:ac-type-h3-negative-bold-solid-poppins-tabmob text-white">{ title }</h3>
              <RichtText font="dark" classNames="ac-type-body-positive-solid-nunitosans-desktop w-t:ac-type-h6-bold-solid-poppins-tablet w-p:ac-type-body-positive-solid-nunitosans-tabmob" data={{ content }} />
            </div>
            <Image src={src} alt={alt} classNames="h-[296px] w-t:h-[314px] w-p:h-[157px] w-[590px] w-t:w-auto w-p:w-auto w-t:ml-[100px] w-t:mr-[24px] w-p:ml-[32px] w-p:mr-[24px]" classNamesImg="aspect-2/1" />
          </div>)
        }
      </section>)
    }
  </section>
}

export default Rainbow