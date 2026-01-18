import { OrderbookData } from "@/types/binance";

export const mockOrderbookData: OrderbookData = {
  lastUpdateId: 123456789,
  bids: [
    ["95000.00", "1.5"],
    ["94999.00", "2.0"],
    ["94998.00", "0.8"],
    ["94997.00", "1.2"],
    ["94996.00", "0.5"],
  ],
  asks: [
    ["95001.00", "0.7"],
    ["95002.00", "1.3"],
    ["95003.00", "2.1"],
    ["95004.00", "0.9"],
    ["95005.00", "1.8"],
  ],
};

export const mockEmptyOrderbookData: OrderbookData = {
  lastUpdateId: 0,
  bids: [],
  asks: [],
};
