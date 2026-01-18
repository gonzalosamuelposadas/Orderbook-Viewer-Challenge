import { INFO_MESSAGES } from "@/constants/messages";

export const OrderbookEmpty = () => (
  <div
    data-testid="orderbook-empty"
    className="bg-binance-card rounded-lg border border-binance-border min-h-[600px] flex items-center justify-center"
  >
    <p className="text-binance-text-secondary text-sm">
      {INFO_MESSAGES.NO_ORDERBOOK_DATA}
    </p>
  </div>
);
