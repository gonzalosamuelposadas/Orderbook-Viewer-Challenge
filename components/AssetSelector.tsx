import { NAMESPACE_UUID } from "@/constants/uuid";
import { v5 as uuidv5 } from "uuid";

export interface AssetSelectorProps {
  symbols: string[];
  selectedSymbol?: string;
  onSymbolChange: (symbol: string) => void;
}

export const AssetSelector = ({
  symbols,
  selectedSymbol,
  onSymbolChange,
}: AssetSelectorProps) => {
  return (
    <div className="flex items-center gap-4 bg-binance-card px-6 py-4 rounded-lg border border-binance-border">
      <label
        htmlFor="symbol-select"
        className="text-sm text-binance-text-secondary font-medium"
      >
        Trading Pair:
      </label>
      <select
        id="symbol-select"
        value={selectedSymbol}
        onChange={(e) => onSymbolChange(e.target.value)}
        className="bg-binance-bg text-binance-text border border-binance-border px-4 py-2 rounded-md text-base cursor-pointer min-w-[150px] transition-all hover:border-binance-yellow focus:outline-none focus:border-binance-yellow focus:ring-2 focus:ring-binance-yellow/10"
      >
        {symbols.map((symbol) => (
          <option key={uuidv5(symbol, NAMESPACE_UUID)} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
    </div>
  );
};
