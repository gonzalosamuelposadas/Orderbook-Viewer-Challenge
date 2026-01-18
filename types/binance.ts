export type OrderbookEntry = [string, string];

export interface OrderbookData {
  lastUpdateId: number;
  bids: OrderbookEntry[];
  asks: OrderbookEntry[];
}

export interface OrderbookLevel {
  price: number;
  quantity: number;
  total: number;
}

export interface TradingPair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  status: string;
}

export type RateLimitType = "REQUEST_WEIGHT" | "ORDERS" | "RAW_REQUESTS";

export type RateLimitInterval = "SECOND" | "MINUTE" | "DAY";

export interface RateLimit {
  rateLimitType: RateLimitType;
  interval: RateLimitInterval;
  intervalNum: number;
  limit: number;
}

export type SymbolStatus =
  | "TRADING"
  | "HALT"
  | "BREAK"
  | "AUCTION_MATCH"
  | "END_OF_DAY";

export type OrderType =
  | "LIMIT"
  | "LIMIT_MAKER"
  | "MARKET"
  | "STOP_LOSS"
  | "STOP_LOSS_LIMIT"
  | "TAKE_PROFIT"
  | "TAKE_PROFIT_LIMIT";

export type SelfTradePreventionMode =
  | "EXPIRE_TAKER"
  | "EXPIRE_MAKER"
  | "EXPIRE_BOTH"
  | "DECREMENT";

export interface PriceFilter {
  filterType: "PRICE_FILTER";
  minPrice: string;
  maxPrice: string;
  tickSize: string;
}

export interface LotSizeFilter {
  filterType: "LOT_SIZE";
  minQty: string;
  maxQty: string;
  stepSize: string;
}

export interface IcebergPartsFilter {
  filterType: "ICEBERG_PARTS";
  limit: number;
}

export interface MarketLotSizeFilter {
  filterType: "MARKET_LOT_SIZE";
  minQty: string;
  maxQty: string;
  stepSize: string;
}

export interface TrailingDeltaFilter {
  filterType: "TRAILING_DELTA";
  minTrailingAboveDelta: number;
  maxTrailingAboveDelta: number;
  minTrailingBelowDelta: number;
  maxTrailingBelowDelta: number;
}

export interface PercentPriceBySideFilter {
  filterType: "PERCENT_PRICE_BY_SIDE";
  bidMultiplierUp: string;
  bidMultiplierDown: string;
  askMultiplierUp: string;
  askMultiplierDown: string;
  avgPriceMins: number;
}

export interface NotionalFilter {
  filterType: "NOTIONAL";
  minNotional: string;
  applyMinToMarket: boolean;
  maxNotional: string;
  applyMaxToMarket: boolean;
  avgPriceMins: number;
}

export interface MaxNumOrdersFilter {
  filterType: "MAX_NUM_ORDERS";
  maxNumOrders: number;
}

export interface MaxNumOrderListsFilter {
  filterType: "MAX_NUM_ORDER_LISTS";
  maxNumOrderLists: number;
}

export interface MaxNumAlgoOrdersFilter {
  filterType: "MAX_NUM_ALGO_ORDERS";
  maxNumAlgoOrders: number;
}

export interface MaxNumOrderAmendsFilter {
  filterType: "MAX_NUM_ORDER_AMENDS";
  maxNumOrderAmends: number;
}

export type SymbolFilter =
  | PriceFilter
  | LotSizeFilter
  | IcebergPartsFilter
  | MarketLotSizeFilter
  | TrailingDeltaFilter
  | PercentPriceBySideFilter
  | NotionalFilter
  | MaxNumOrdersFilter
  | MaxNumOrderListsFilter
  | MaxNumAlgoOrdersFilter
  | MaxNumOrderAmendsFilter;

export interface ExchangeSymbol {
  symbol: string;
  status: SymbolStatus;

  baseAsset: string;
  quoteAsset: string;

  baseAssetPrecision: number;
  quotePrecision: number;
  quoteAssetPrecision: number;

  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;

  orderTypes: OrderType[];

  icebergAllowed: boolean;
  ocoAllowed: boolean;
  otoAllowed: boolean;
  opoAllowed: boolean;

  quoteOrderQtyMarketAllowed: boolean;
  allowTrailingStop: boolean;
  cancelReplaceAllowed: boolean;
  amendAllowed: boolean;
  pegInstructionsAllowed: boolean;

  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;

  filters: SymbolFilter[];

  permissions: string[];
  permissionSets: string[][];

  defaultSelfTradePreventionMode: SelfTradePreventionMode;
  allowedSelfTradePreventionModes: SelfTradePreventionMode[];
}

export interface ExchangeInfoData {
  exchangeFilters: unknown[];
  rateLimits: RateLimit[];
  serverTime: number;
  symbols: ExchangeSymbol[];
  timezone: string;
}
