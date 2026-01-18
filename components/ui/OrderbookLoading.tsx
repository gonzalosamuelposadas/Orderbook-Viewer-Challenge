import { LOADING_MESSAGES } from "@/constants/messages";

export const OrderbookLoading = () => (
  <div
    data-testid="orderbook-loading"
    className="bg-binance-card rounded-lg border border-binance-border min-h-[600px] flex items-center justify-center"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-binance-text-secondary border-t-transparent" />
      <p className="text-binance-text-secondary text-sm">
        {LOADING_MESSAGES.LOADING_ORDERBOOK}
      </p>
    </div>
  </div>
);
