"use client";

import { useMemo } from "react";
import { calculateLevels } from "@/helpers/calculateLevels";
import { useOrderbookWebSocket } from "@/hooks/useOrderbookWebSocket";
import { OrderbookSide } from "./OrderbookSide";
import { OrderbookLoading } from "./ui/OrderbookLoading";
import { OrderbookEmpty } from "./ui/OrderbookEmpty";
import { OrderbookError } from "./ui/OrderbookError";
import { ERROR_MESSAGES } from "@/constants/messages";

interface OrderbookDisplayProps {
  symbol: string;
}

export const OrderbookDisplay = ({ symbol }: OrderbookDisplayProps) => {
  const {
    data: orderbook,
    isLoading,
    error,
  } = useOrderbookWebSocket(symbol, 10);

  const dataUpdatedAt = orderbook ? Date.now() : undefined;

  const isInitialLoading = isLoading && !orderbook;
  const isInitialError = !!error && !orderbook;
  const hasData = !!orderbook;

  const { asks, bids, maxTotal } = useMemo(() => {
    if (!orderbook) {
      return { asks: [], bids: [], maxTotal: 0 };
    }

    const asks = calculateLevels(orderbook.asks).reverse();
    const bids = calculateLevels(orderbook.bids);

    const maxTotal = Math.max(
      Math.max(...asks.map((a) => a.total)),
      Math.max(...bids.map((b) => b.total)),
    );

    return { asks, bids, maxTotal };
  }, [orderbook]);

  if (isInitialLoading) {
    return <OrderbookLoading />;
  }

  if (isInitialError) {
    return <OrderbookError error={error} />;
  }

  if (!hasData) {
    return <OrderbookEmpty />;
  }

  const bestBid = bids[0]?.price || 0;
  const bestAsk = asks[asks.length - 1]?.price || 0;
  const spread = bestAsk - bestBid;
  const spreadPercent = bestBid > 0 ? (spread / bestBid) * 100 : 0;

  return (
    <div className="bg-binance-card rounded-lg border border-binance-border overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b border-binance-border bg-[#181a20]">
        <h2 className="text-xl font-semibold text-binance-text">
          Orderbook - {symbol}
        </h2>
        {dataUpdatedAt && (
          <div className="text-sm text-binance-text-secondary">
            Last update: {new Date(dataUpdatedAt).toLocaleTimeString()}
          </div>
        )}
      </div>

      {error && orderbook && (
        <div className="bg-binance-red/10 border-l-4 border-binance-red text-binance-red px-6 py-3 text-sm">
          {error instanceof Error
            ? error.message
            : ERROR_MESSAGES.FAILED_TO_UPDATE}
        </div>
      )}

      <div className="flex justify-center items-center gap-2 py-3 px-4 bg-[#181a20] border-b border-binance-border">
        <div className="text-sm text-binance-text-secondary">Spread:</div>
        <div className="text-sm font-semibold text-binance-text">
          {spread.toFixed(2)} ({spreadPercent.toFixed(3)}%)
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-4 px-4 py-2 text-xs text-binance-text-secondary font-semibold uppercase">
          <div className="text-left">Price (USDT)</div>
          <div className="text-right">Quantity</div>
          <div className="text-right">Total</div>
        </div>

        <div className="mb-2">
          <OrderbookSide items={asks} maxTotal={maxTotal} side="ask" />
        </div>

        <div className="flex justify-between items-center px-4 py-3 my-2 bg-white/5 rounded-md text-base font-semibold">
          <div className="text-binance-text-secondary text-sm">
            {bestAsk.toFixed(2)}
          </div>
          <div className="text-binance-yellow text-2xl">↕</div>
          <div className="text-binance-text-secondary text-sm">
            {bestBid.toFixed(2)}
          </div>
        </div>

        <div className="mt-2">
          <OrderbookSide items={bids} maxTotal={maxTotal} side="bid" />
        </div>
      </div>
    </div>
  );
};
