import { createRef, FC, memo, useEffect, useState } from "react"
import CardWebsiteComponentData from "@/types/CardWebsite.types"
import Link from "@/old-components/Link"
import { LinkInit } from "@/old-components/fixture"
import RichtText from "@/old-components/Richtext/Richtext"

const CardWebsite: FC<CardWebsiteComponentData> = memo(({ data, onClick }: CardWebsiteComponentData) => {
  const cardWebsitePortalverseRef = createRef();

  const [ linkTextData, setLinkTextData ] = useState({...LinkInit});
  const [ linkLinkData, setLinkLinkData ] = useState({...LinkInit});

  const [content, setContent] = useState('')

  useEffect(()=> {
    (cardWebsitePortalverseRef.current as any).data ={
      id: data.id || '',
      urlImage: data.urlImage || '',
      subtitle: data.subtitle || '',
      title: data.title || '',
      text: data.text || '',
      border: data.border || true,
      allContent: data.allContent || true,
      height: data.height || '',
      isShowCardWebsiteContent: data.isShowCardWebsiteContent || false,
      background: data.background || true,
      type: data.type || '',
      link: data.link || true,
      linkIcon: data.linkText || {...LinkInit},
      linkText: data.linkIcon || {...LinkInit},
      wrapper: data.wrapper || false
    };
    setLinkLinkData({...linkLinkData, ...data.linkIcon});
    setLinkTextData({...linkTextData, ...data.linkIcon});
    setContent(`${data.text || ''}`)
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let observerRef: any = null;
    if (!!cardWebsitePortalverseRef.current) {
      observerRef = cardWebsitePortalverseRef.current;
      (cardWebsitePortalverseRef.current as any).removeEventListener('onClick', onClick, false);
    }
    (cardWebsitePortalverseRef.current as any).addEventListener('onClick', onClick, false);
    return () => {
      if (!!observerRef) {
        (observerRef as any).removeEventListener('onClick', onClick, false);
      }
    }
  }, [onClick]);// eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-card-website-portalverse ref={cardWebsitePortalverseRef}>
    <div slot="areaCardWebsiteLink">
      <Link data={linkTextData} onClick={onClick} />
    </div>
    <div slot="areaCardWebsiteLinkIcon">
      <Link data={linkTextData} onClick={onClick} />
    </div>
    <div className="flex flex-col gap-2" slot="areaContentCardWebsite">
      <p className="font-Nunito-Sans font-normal w-d:text-base w-d:leading-5 w-t:text-sm w-t:leading-[17.5px] w-p:text-sm w-p:leading-[17.5px] text-[#686868]">{ data.subtitle }</p>
      <h2 className="font-Poppins font-semibold w-d:text-[22px] w-d:leading-7 w-t:text-base w-t:leading-5 w-p:text-base w-p:leading-5">{ data.title }</h2>
      <RichtText data={{content}}/>
    </div>
  </lottus-card-website-portalverse>
});

export default CardWebsite;