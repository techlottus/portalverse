const fs = require('fs')
const dotenv = require('dotenv').config();
const { env } = require('process')
const { getGeneralConfigData } = require("./getGeneralData")



async function createGeneralData  () {
  let scripts = []
  sendWhatsapp = null
  try {
    const generalConfig = await getGeneralConfigData();
    scripts = generalConfig?.attributes?.scriptsPixels || [];
    sendWhatsapp = generalConfig?.attributes?.sendWhatsapp || null;
  } catch (error) {
    console.log(error);
  }

  const scriptTypes = `{ type?: 'ComponentSectionsScriptPixel'; name: string; script?: string; src?: string; async: boolean; pixel?: { src?: string; element?:  'iframe' | 'img' | null; } | null; enabled?: boolean; triggerOnRouteChange?: "gtagPageview" | "fbqPageview" | null; } `
  const sendWhatsappTypes = `{ type?: 'ComponentMiscSendWhatsapp'; hidden: boolean; phone: number } `
  fs.writeFile('./GeneralConfig.ts', `
  export const scripts: ${scriptTypes}[] | [] = ${JSON.stringify(scripts)} \n;
  export const sendWhatsapp: ${sendWhatsappTypes} | null = ${JSON.stringify(sendWhatsapp)} \n;
  `, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });

}
createGeneralData()
