"use client";

import { useState, useMemo, useEffect } from "react";
import { AssetSelector, OrderbookDisplay } from "@/components";
import { useGetExchangeInfo } from "@/hooks/useGetExhangeInfo";
import { mapExchangeInfoToSymbols } from "@/helpers/mapApiExchangeInfoToSymbol";
import { Container } from "@/components/ui";
import { LOADING_MESSAGES } from "@/constants/messages";

const Home = () => {
  const {
    isLoading,
    isError,
    data: exchangeInfoData,
    error,
  } = useGetExchangeInfo();

  const symbols = useMemo(
    () => mapExchangeInfoToSymbols(exchangeInfoData),
    [exchangeInfoData],
  );

  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!selectedSymbol && symbols.length > 0) {
      setSelectedSymbol(symbols[0]);
    }
  }, [symbols, selectedSymbol]);

  if (isLoading) {
    return (
      <Container>
        <div className="w-12 h-12 border-4 border-binance-border border-t-binance-yellow rounded-full animate-spin"></div>
        <p className="text-binance-text-secondary text-base">
          {LOADING_MESSAGES.LOADING_TRADING_PAIRS}
        </p>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <p className="text-binance-red text-lg text-center">{error?.message}</p>
      </Container>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-binance-yellow to-binance-yellow-light bg-clip-text text-transparent">
          Binance Orderbook Viewer challenge
        </h1>
        <p className="text-binance-text-secondary text-base">
          Real-time orderbook data from Binance API
        </p>
      </header>

      <div className="mb-8 flex justify-center">
        <AssetSelector
          symbols={symbols.length > 0 ? symbols : []}
          selectedSymbol={selectedSymbol}
          onSymbolChange={setSelectedSymbol}
        />
      </div>

      <div className="mb-8">
        {selectedSymbol && <OrderbookDisplay symbol={selectedSymbol} />}
      </div>

      <footer className="text-center py-8 text-binance-text-secondary text-sm">
        <p>Data provided by Binance Public API</p>
        <p className="mt-2 text-xs text-binance-text-tertiary">
          Real-time updates via WebSocket
        </p>
      </footer>
    </main>
  );
};

export default Home;
