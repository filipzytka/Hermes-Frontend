type TRequest = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  headers?: HeadersInit;
  body?: string;
};

type TResponse<T> = {
  payload?: T;
  success: boolean;
  error?: string;
};

export const fetchRequest = async <T>({
  method,
  endpoint,
  body,
  headers = {},
}: TRequest): Promise<TResponse<T>> => {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body,
      credentials: "include",
    });

    const responseBody = await response.json();
    const success = response.ok;

    return { payload: responseBody, success };
  } catch (error) {
    return { error: String(error), success: false };
  }
};

export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue;
  }
  return undefined;
};
