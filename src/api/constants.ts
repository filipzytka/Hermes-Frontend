declare global {
  interface Window {
    ENV_API_BASE_URL: string;
    ENV_REACT_BASE_URL: string;
  }
}

export const SERVER_URL = window.ENV_API_BASE_URL;
export const REACT_URL = window.ENV_REACT_BASE_URL;
