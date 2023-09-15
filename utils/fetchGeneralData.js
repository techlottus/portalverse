const fs = require('fs')
const dotenv = require('dotenv').config();
const { env } = require('process')
const { getGeneralConfigData } = require("./getGeneralData")



async function createGeneralData  () {
  const generalConfig = await getGeneralConfigData();
  const scripts = generalConfig?.attributes?.scriptsPixels;

 
  fs.writeFile('./GeneralConfig.ts', `
  export const scripts: [{type: "ComponentSectionsScriptPixel"; name: string; script: string; pixel: { src?: string; element?:  'iframe' | 'img'; } }]  = ${JSON.stringify(scripts)} \n;
  `, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });

}
createGeneralData()
