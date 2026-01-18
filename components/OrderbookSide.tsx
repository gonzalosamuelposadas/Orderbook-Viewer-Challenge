import { NAMESPACE_UUID } from "@/constants/uuid";
import { memo } from "react";
import { v5 as uuidv5 } from "uuid";

interface OrderbookSideProps {
  items: {
    price: number;
    quantity: number;
    total: number;
  }[];
  maxTotal: number;
  side: "ask" | "bid";
}

const OrderbookSideComponent = ({
  items,
  maxTotal,
  side,
}: OrderbookSideProps) => {
  const isAsk = side === "ask";

  return (
    <>
      {items.map((item) => {
        const depthPercent = (item.total / maxTotal) * 100;

        return (
          <div
            key={uuidv5(`${side}-${item.price}`, NAMESPACE_UUID)}
            className="grid grid-cols-3 gap-4 px-4 py-1.5 text-sm relative transition-colors hover:bg-white/5"
          >
            <div
              className={`absolute top-0 ${
                isAsk ? "left-0" : "right-0"
              } h-full w-full z-0 transition-transform duration-300 ${
                isAsk ? "bg-binance-red/15" : "bg-binance-green/15"
              }`}
              style={{
                transform: `scaleX(${depthPercent / 100})`,
                transformOrigin: isAsk ? "left" : "right",
              }}
            />

            <div
              className={`text-left font-semibold relative z-10 ${
                isAsk ? "text-binance-red" : "text-binance-green"
              }`}
            >
              {item.price.toFixed(4)}
            </div>

            <div className="text-right relative z-10 text-binance-text">
              {item.quantity.toFixed(6)}
            </div>

            <div className="text-right relative z-10 text-binance-text">
              {item.total.toFixed(6)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export const OrderbookSide = memo(OrderbookSideComponent);
