import { mapExchangeInfoToSymbols } from "../mapApiExchangeInfoToSymbol";
import { ExchangeInfoData, ExchangeSymbol } from "@/types/binance";

const createMockSymbol = (symbol: string): ExchangeSymbol => ({
  symbol,
  status: "TRADING",
  baseAsset: "BTC",
  quoteAsset: "USDT",
  baseAssetPrecision: 8,
  quotePrecision: 8,
  quoteAssetPrecision: 8,
  baseCommissionPrecision: 8,
  quoteCommissionPrecision: 8,
  orderTypes: ["LIMIT", "MARKET"],
  icebergAllowed: false,
  ocoAllowed: false,
  otoAllowed: false,
  opoAllowed: false,
  quoteOrderQtyMarketAllowed: false,
  allowTrailingStop: false,
  cancelReplaceAllowed: false,
  amendAllowed: false,
  pegInstructionsAllowed: false,
  isSpotTradingAllowed: true,
  isMarginTradingAllowed: false,
  filters: [],
  permissions: [],
  permissionSets: [],
  defaultSelfTradePreventionMode: "EXPIRE_TAKER",
  allowedSelfTradePreventionModes: ["EXPIRE_TAKER"],
});

const mockExchangeInfo: ExchangeInfoData = {
  exchangeFilters: [],
  rateLimits: [],
  serverTime: Date.now(),
  symbols: [
    createMockSymbol("BTCUSDT"),
    createMockSymbol("ETHUSDT"),
    createMockSymbol("BNBUSDT"),
    createMockSymbol("SOLUSDT"),
    createMockSymbol("XRPUSDT"),
    createMockSymbol("ADAUSDT"),
    createMockSymbol("DOGEUSDT"),
  ],
  timezone: "UTC",
};

describe("mapExchangeInfoToSymbols", () => {
  it("limits symbols correctly", () => {
    const result = mapExchangeInfoToSymbols(mockExchangeInfo, 5);
    expect(result).toHaveLength(5);
  });
});
