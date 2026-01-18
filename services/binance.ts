import { OrderbookData, ExchangeInfoData } from "@/types/binance";
import { apiClient } from "./api";
import { ERROR_MESSAGES } from "@/constants/messages";

export const getOrderbook = async (
  symbol: string,
  limit = 10,
): Promise<OrderbookData> => {
  try {
    const { data } = await apiClient.get<OrderbookData>("/depth", {
      params: { symbol, limit },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGES.FAILED_TO_LOAD_ORDERBOOK);
  }
};

export const getExchangeInfo = async () => {
  try {
    const { data } = await apiClient.get<ExchangeInfoData>("/exchangeInfo");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_MESSAGES.ERROR_EXCHANGE_INFO);
  }
};
