import { useEffect, useRef, useState } from "react";
import { OrderbookData } from "@/types/binance";

const WS_BASE_URL = "wss://stream.binance.com:9443/ws";
const RECONNECT_DELAY = 3000;
const MAX_RECONNECT_ATTEMPTS = 5;

interface UseOrderbookWebSocketReturn {
  data: OrderbookData | null;
  isLoading: boolean;
  error: Error | null;
  isConnected: boolean;
}

export function useOrderbookWebSocket(
  symbol: string,
  limit = 10,
): UseOrderbookWebSocketReturn {
  const [data, setData] = useState<OrderbookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    if (!symbol) {
      setIsLoading(false);
      return;
    }

    const connect = () => {
      setIsLoading(true);

      const streamName = `${symbol.toLowerCase()}@depth${limit}@100ms`;
      const wsUrl = `${WS_BASE_URL}/${streamName}`;
      const ws = new WebSocket(wsUrl);

      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          setData({
            lastUpdateId: message.lastUpdateId,
            bids: message.bids,
            asks: message.asks,
          });

          setIsLoading(false);
        } catch {
          setError(new Error("Failed to parse orderbook data"));
        }
      };

      ws.onerror = () => {
        setError(new Error("WebSocket connection error"));
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsLoading(true);

        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current += 1;
          reconnectTimeoutRef.current = setTimeout(connect, RECONNECT_DELAY);
        } else {
          setError(new Error("Failed to connect after multiple attempts"));
          setIsLoading(false);
        }
      };
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [symbol, limit]);

  return { data, isLoading, error, isConnected };
}
