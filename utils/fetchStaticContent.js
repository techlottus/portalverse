const fs = require("fs");
const { mkdir } = require('fs/promises')
const { getStaticContents } = require("./getStaticContents")

async function fetchStaticContents() {
  const staticContents = await getStaticContents();
  staticContents?.forEach((staticContent) => {
    populateStaticContent(staticContent);
  });
};

async function populateStaticContent(staticContent) {
  const {
    format,
    path,
    content
  } = staticContent?.attributes;

  const pathArray = path.split("/");
  pathArray.pop(-1);

  let pathFolder = '';    

  if (!!content) {
    const fileContent = format === "json" ? 
      JSON.stringify(JSON.parse(content), null, 2) :
      content;

    if(pathArray.length>0){

      pathArray.forEach((p)=>pathFolder += p +'/' );

      if (!fs.existsSync(pathFolder)) {
        await mkdir(pathFolder, {
        recursive: true,
        })
      }
    }
    
    fs?.writeFile("./"+path, fileContent,
    "utf-8", 
    (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

fetchStaticContents();