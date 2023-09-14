
import React from 'react'
import Script from 'next/script'

export default ({script, pixel, ID}: { script?: string, pixel?: string, ID?: string }) => {
  return(
    <>
      { !!script && <Script id={ID} strategy='afterInteractive' dangerouslySetInnerHTML={{ __html: script }}/>}
        { !!pixel &&
          <noscript>
            <iframe src={pixel} height="0" width="0" style={{"display":"none","visibility":"hidden"}}></iframe>
      
          </noscript>
        }
    </>
  )
}