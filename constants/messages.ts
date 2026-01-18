export const ERROR_MESSAGES = {
  FAILED_TO_LOAD_ORDERBOOK: "Failed to load orderbook",
  FAILED_TO_UPDATE: "Failed to update",
  ERROR_EXCHANGE_INFO: "Error exchange information, please try later",
  UPDATE_FAILED: "Update failed: ",
} as const;

export const LOADING_MESSAGES = {
  LOADING_ORDERBOOK: "Loading orderbook...",
  LOADING_TRADING_PAIRS: "Loading trading pairs...",
} as const;

export const INFO_MESSAGES = {
  NO_ORDERBOOK_DATA: "No orderbook data available",
} as const;
