import axios from "axios";
import { SERVER_URL } from "./constants";
import { TAuthResponse } from "./response-types";
import { getCookie } from "./helpers";

export const authenticateUser = async () => {
  if (!getCookie("active")) {
    return;
  }

  const { data, status } = await axios.get<TAuthResponse>(
    `${SERVER_URL}/api/auth/check`,
    {
      withCredentials: true,
    }
  );
  return { data, status };
};

// export const loginUser = async (email: string, password: string) => {
//   const { data } = await axios.post<TAuthResponse>(
//     `${SERVER_URL}/api/auth/login`,
//     {
//       email,
//       password,
//     },
//     {
//       withCredentials: true,
//     }
//   );

//   return data;
// };

export const loginUser = async (email: string, password: string) => {
  try {
    console.log("Sending login request to:", `${SERVER_URL}/api/auth/login`);
    console.log("Request payload:", { email, password });

    const { data } = await axios.post<TAuthResponse>(
      `${SERVER_URL}/api/auth/login`,
      { email, password },
      {
        withCredentials: true, // Ensures cookies are sent if needed
      }
    );

    console.log("Login successful, response data:", data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Request made and server responded
        console.error("Error response from server:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Axios request setup error:", error.message);
      }
    } else {
      // Non-Axios error
      console.error("Unexpected error:", error);
    }
    throw error; // Rethrow to ensure test failures
  }
};

export const logoutUser = async () => {
  await axios.post(
    `${SERVER_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};
