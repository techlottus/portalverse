import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { SEO, type SeoData } from "@/utils/strapi/sections/SEO";
import { WEB_ERROR, WebErrorSection } from "./strapi/sections/WebError";
import { Pixel, SCRIPTS_PIXELS } from "./strapi/sections/ScriptPixel";

// export type NotfoundSection = WebErrorSection

type generalConfigResponse = {
  generalConfig: {
    data: {
      attributes: {
        scriptsPixels : {
          name: string;
          script: string;
          pixel: Pixel
        }
      };
    };
  };
};

export const getGeneralConfigData = async () => {
  try {
    const data = await fetchStrapiGraphQL<generalConfigResponse>(GeneralConfig);
    return data;
  } catch (error:any) {
    throw new Error(error)
  }
};


export const GeneralConfig = `
query GeneralConfig {
  generalConfig {
    data {
      attributes {
        scriptsPixels {
          ${SCRIPTS_PIXELS}
        }
      }
    }
  }
}
`;
