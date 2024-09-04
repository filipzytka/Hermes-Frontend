import { SERVER_URL } from "./constants";
import { fetchRequest } from "./helpers";
import { TTokenResponse } from "./response-types";

export const generateToken = (createdBy: string) =>
  fetchRequest<TTokenResponse>({
    method: "POST",
    endpoint: `${SERVER_URL}/api/invite/generate`,
    body: JSON.stringify({
      createdBy,
    }),
  });

export const validateToken = (token: string) =>
  fetchRequest<TTokenResponse>({
    method: "POST",
    endpoint: `${SERVER_URL}/api/invite/validate`,
    body: JSON.stringify({
      token,
    }),
  });
