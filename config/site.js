export const SITE_URL =
  process.env.NODE_ENV == "production"
    ? "https://karsagi.com"
    : "http://192.168.1.101:3000";

export const API_URL =
  process.env.NODE_ENV == "production"
    ? "https://api.karsagi.com"
    : "http://192.168.1.101:8080";

export const STATIC_URL =
  process.env.NODE_ENV == "production"
    ? "https://static.karsagi.com"
    : "http://192.168.1.101:8080";
