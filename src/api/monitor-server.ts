import { SERVER_URL } from "./constants";
import { fetchRequest } from "./helpers";
import { TMessageResponse, TServerDataResponse } from "./response-types";

export const getServerData = () =>
  fetchRequest<TServerDataResponse[]>({
    method: "GET",
    endpoint: `${SERVER_URL}/api/server/get/data`,
  });

export const getServerStatus = () =>
  fetchRequest<TMessageResponse>({
    method: "GET",
    endpoint: `${SERVER_URL}/api/server/status`,
  });
