type TRequest = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  headers?: HeadersInit;
  body?: string;
};

export const fetchRequest = async <T>({
  method,
  endpoint,
  body,
  headers = {},
}: TRequest): Promise<{
  success: boolean;
  data?: T;
  message?: string;
}> => {
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

    if (response.ok) {
      return { success: true, data: responseBody };
    }

    return {
      success: false,
      message: responseBody.message ?? "Request failed",
    };
  } catch (error) {
    return { success: false, message: String(error) };
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
