const fs = require('fs')
const dotenv = require('dotenv').config();
const { env } = require('process')
const { getGeneralConfigData } = require("./getGeneralData")

async function createGeneralData() {

  let scripts = []
  sendWhatsapp = null
  let robotsLines = ''

  try {

    const generalConfig = await getGeneralConfigData();
    scripts = generalConfig?.attributes?.scriptsPixels || [];
    sendWhatsapp = generalConfig?.attributes?.sendWhatsapp || null;
    /*For robots file                                                     if accent is empty add a \n */
    generalConfig?.attributes?.robots.map((robotLine) => robotLine?.accent ? robotsLines += robotLine?.accent + '\n' : robotsLines += '\n')

  } catch (error) {
    console.log(error);
  }

  const scriptTypes = `{ type?: 'ComponentSectionsScriptPixel'; name: string; script?: string; src?: string | null; async: boolean; crossorigin?: boolean; integrity?: string | null; strategy: "afterInteractive" | "beforeInteractive" | "lazyOnload" | "worker"; pixel?: { src?: string; element?:  'iframe' | 'img' | null; } | null; enabled?: boolean; triggerOnRouteChange?: "gtagPageview" | "fbqPageview" | null; } `
  const sendWhatsappTypes = `{ type?: 'ComponentMiscSendWhatsapp'; hidden: boolean; phone: number } `
  /*Generate generalConfig.ts  */
  fs.writeFile('./GeneralConfig.ts', `
  export const scripts: ${scriptTypes}[] | [] = ${JSON.stringify(scripts)} \n;
  export const sendWhatsapp: ${sendWhatsappTypes} | null = ${JSON.stringify(sendWhatsapp)} \n;
  `, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });
  /*Generate robots.txt in public folder  */
  fs.writeFile('public/robots.txt', `${robotsLines}`, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });

}
createGeneralData()