interface Props {
  error: Error;
}

export const OrderbookError = ({ error }: Props) => (
  <div
    data-testid="orderbook-error"
    className="bg-binance-card rounded-lg border border-binance-border min-h-[600px] flex items-center justify-center"
  >
    <div className="flex flex-col items-center gap-6 px-8">
      <p className="text-binance-red text-base text-center">{error.message}</p>
    </div>
  </div>
);
