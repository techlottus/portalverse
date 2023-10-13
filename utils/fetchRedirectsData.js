const fs = require("fs");
const { getRedirectsConfigData } = require("./getRedirectsData")

async function fetchRedirectsConfig() {

  let redirectsConfig = [];

  try {
    const redirectsConfigData = await getRedirectsConfigData();
    redirectsConfig = redirectsConfigData;
  } catch(e) {
    throw new Error(e);
  }

  const config = {
    redirects: redirectsConfig?.map(item => {
      return {
        destination: item?.attributes?.to,
        source: item?.attributes?.from,
        permanent: item?.attributes?.type === "temporary" ? false : true
      }
    })
  }
  const fileContent = JSON.stringify(config, null, 2);

  fs?.writeFile("./redirectsConfig.json", fileContent,
    "utf-8", 
    (err) => {
      if (err) {
        console.error(err);
      }
    });
  

};

fetchRedirectsConfig();