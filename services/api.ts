import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BINANCE_API_URL || "https://api.binance.com/api/v3",
  timeout: 10000,
});
