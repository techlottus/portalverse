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

  const { data, errors } = await response.json();

  if (response?.ok) {
    if (data) {
      return data;
    } else {
      return Promise.reject(new Error("Failed to get data"));
    }
  } else {
    // Handle the graphql errors
    const error = new Error(errors?.map(error => error?.message).join('\n') ?? 'unknown')
    return Promise.reject(error)
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

async function getStaticContents() {
  const response = await fetchStrapiGraphQL(STATIC_CONTENTS);

  return response?.staticContents?.data;
};

const STATIC_CONTENTS = `
query StaticContents {
  staticContents(publicationState: LIVE, pagination: { start: 0, limit: -1 }) {
  	data {
      attributes {
        format
        content
        path
      }
    }
  }
}
`;

module.exports = {
  getStaticContents
};