require('dotenv').config();

async function fetcher(url, query, token) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      query
    })
  });

  const { data, error } = await response.json();

  if (response?.ok) {
    if (data) {
      return data;
    } else {
      return Promise.reject(new Error("Failed to get data"));
    }
  } else {
    // Handle the graphql error
    return Promise.reject(new Error(error.message))
  }
}

async function fetchStrapiGraphQL(query) {
  const data = await fetcher(
    process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_API,
    query,
    process.env.NEXT_PUBLIC_STRAPI_TOKEN
  );

  return data;
};

async function getRedirectsConfigData() {
  const response = await fetchStrapiGraphQL(REDIRECTS_CONFIG);

  return await response?.redirectsRedirects?.data;
};

const REDIRECTS_CONFIG = `
  query redirects {
    redirectsRedirects {
      data{
        attributes{
          from
          to
          type
        }
      }
    }
  }
`;

module.exports = {
  getRedirectsConfigData
};