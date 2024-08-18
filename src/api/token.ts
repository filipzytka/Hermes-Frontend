import { SERVER_URL_TOKEN } from "./constants";
import { fetchRequest } from "./helpers";
import { TGenerateToken, TValidateToken } from "./response-types";

export const generateToken = async (createdBy: string) => {
  return await fetchRequest<TGenerateToken>({
    method: "POST",
    endpoint: `${SERVER_URL_TOKEN}/generate`,
    body: JSON.stringify({
      createdBy,
    }),
  });
};

export const validateToken = async (token: string) => {
  return await fetchRequest<TValidateToken>({
    method: "POST",
    endpoint: `${SERVER_URL_TOKEN}/validate`,
    body: JSON.stringify({
      token,
    }),
  });
};