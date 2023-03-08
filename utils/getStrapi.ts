import { env } from "process";
import fetcher from "@/utils/fetcher";

export const fetchStrapi = async (model: string, params: string[] ) => {

    return await fetch(`${env.NEXT_PUBLIC_STRAPI_URL}/api/${model}${!!params.length && '?' + params.join('&')}`, {
      headers:{
        'Authorization': `Bearer ${env.NEXT_PUBLIC_STRAPI_TOKEN}`
      }
    })
  }

export async function fetchStrapiGraphQL<DataType> (
  query: string,
  variables?: Record<string, any>
) {
  const data = await fetcher<DataType>(
    //@ts-ignore
    process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_API,
    query,
    process.env.NEXT_PUBLIC_STRAPI_TOKEN,
    variables
  );

  return data;
};

export const replaceURL = (image: any, format?: string) => {
  let urlImage = format 
    ? image.data.attributes.formats[format].url
    : image.data.attributes.url
  urlImage.replace(env.NEXT_PUBLIC_IMAGE_URL, env.NEXT_PUBLIC_ASSETS_URL)
  return urlImage
}