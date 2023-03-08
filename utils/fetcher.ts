async function fetcher<DataType>(
  url: string,
  query: string,
  token: string,
  variables?: Record<string, any>,
  ): Promise<DataType> {

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    type JSONResponse = {
      data?: DataType;
      errors?: Array<{message: string}>;
    }

    const { data, errors }: JSONResponse = await response.json();

    if (response?.ok) {
      if ( data ) {
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

export default fetcher;