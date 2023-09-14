
import React from 'react'
import Script from 'next/script'

export default ({script, pixel, ID, image}: { script?: string, pixel?: string, ID?: string, image: boolean }) => {
  return(
    <>
      { !!script && <Script id={ID} strategy='afterInteractive' dangerouslySetInnerHTML={{ __html: script }}/>}
        { !!pixel &&
          <noscript>
            {
              !!image
                ? <img height="1" width="1" style={{ display: 'none' }} src={pixel}/>
                : <iframe src={pixel} height="0" width="0" style={{"display":"none","visibility":"hidden"}}></iframe>}
      
          </noscript>
        }
    </>
  )
}