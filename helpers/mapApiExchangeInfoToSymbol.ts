import { ExchangeInfoData } from "@/types/binance";

export const mapExchangeInfoToSymbols = (
  data?: ExchangeInfoData,
  limit: number = 5,
): string[] => {
  if (!data?.symbols) {
    return [];
  }

  return data.symbols
    .filter((s) => s.status === "TRADING") //Entiendo que estos son los que estan activos.
    .map((s) => s.symbol)
    .slice(0, limit);
};
