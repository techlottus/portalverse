const fs = require("fs");
const { getEducationalLevelsConfig } = require("./getEducationalLevelsConfig")

async function fetchStaticContents() {

  let educationalLevelsConfig = [];

  try {
    const educationalLevelsConfigData = await getEducationalLevelsConfig();
    educationalLevelsConfig = educationalLevelsConfigData;
  } catch(e) {
    throw new Error(e);
  }

  const config = {
    educationalLevels: educationalLevelsConfig?.map(item => {
      return {
        name: item?.level?.data?.attributes?.title,
        path: item?.slug
      }
    })
  }

  const fileContent = JSON.stringify(config, null, 2);

  fs?.writeFile("./routesConfig.json", fileContent,
    "utf-8", 
    (err) => {
      if (err) {
        console.error(err);
      }
    });
  

};

fetchStaticContents();