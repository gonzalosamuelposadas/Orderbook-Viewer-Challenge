import { OrderbookLevel } from "@/types/binance";

export const calculateLevels = (
  entries: [string, string][],
): OrderbookLevel[] => {
  let total = 0;
  return entries.map(([price, quantity]) => {
    const priceNum = parseFloat(price);
    const quantityNum = parseFloat(quantity);
    total += quantityNum;
    return {
      price: priceNum,
      quantity: quantityNum,
      total,
    };
  });
};
