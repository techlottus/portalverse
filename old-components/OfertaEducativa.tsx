import { FC, memo, useEffect, useState } from "react"
import Link from "next/link"
import cn from "classnames"
import PromoLink from "@/old-components/PromoLink"

const OfertaEducativa: FC<any> = memo(({ data, classNames } : any) => {

  const [ baseHeight ] = useState<Array<string>>(["282px", "346px", "143px"]);
  const [ changeDetect, setChangeDetect ] = useState<number>(0);
  const [ allPromos, setAllPromos ] = useState<Array<any>>([]);

  useEffect(() => {
    setAllPromos([ ...data ]);
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

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
    let newH = baseHeight[0];
    if (outerWidth < 1024 && outerWidth >= 600) {
      newH = baseHeight[1];
    }
    if ( outerWidth < 600) {
      newH = baseHeight[2];
    }
    const newAllPromosConf = data.reduce((p: any, c: any) => [ ...p, { ...c, promo: { ...c.promo, height: newH } }], []);
    setAllPromos([ ...newAllPromosConf ]);
  }, [changeDetect]);// eslint-disable-line react-hooks/exhaustive-deps
    
  return (
    <section className={cn("col-span-12 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-2", classNames)}>
      {
        allPromos.map((content: any, i: number) => <section key={`section-oferta-${i}`}>
            <Link href={content?.url || "/"}>

              <PromoLink data={{
                ...content.promo
              }} />

            </Link>
          </section>)
      }
    </section>
  );
})

export default OfertaEducativa