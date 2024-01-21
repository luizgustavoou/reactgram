export const baseURL = "http://localhost:5000";

export const uploadsURL = `${baseURL}/uploads`;

export const requestConfig = (
  method: string,
  data: any,
  token: string | null = null,
  image: boolean | null = null
): RequestInit => {
  let config: RequestInit;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || !data) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token && config.headers) {
    (<any>config.headers).Authorization = `Bearer ${token}`;
  }

  return config;
};
