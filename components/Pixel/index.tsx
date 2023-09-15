
import React from 'react'
import Script from 'next/script'
import Head from 'next/head'

export default ({script, pixel, name}: { script?: string, pixel?: {src: string, element?: 'iframe' | 'img'}, name?: string  }) => {
  return(
    <>
      { !!script && <Script id={name} strategy='afterInteractive' dangerouslySetInnerHTML={{ __html: script }}/>}
        { !!pixel &&
        <Head>
          <noscript>
            {
              pixel.element && 
                (
                  pixel.element === 'img' && <img height="1" width="1" style={{ display: 'none' }} src={pixel.src}/>
                  ||
                  pixel.element === 'iframe' && <iframe src={pixel.src} height="0" width="0" style={{"display":"none","visibility":"hidden"}}></iframe>
                )
            }
          </noscript>
        </Head>
        }
    </>
  )
}