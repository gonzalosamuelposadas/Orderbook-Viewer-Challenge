import { useQuery } from "@tanstack/react-query";
import { getExchangeInfo } from "@/services/binance";
import { EXCHANGE_QUERY_KEY } from "@/helpers/queryKeys";

export function useGetExchangeInfo() {
  return useQuery({
    queryKey: [EXCHANGE_QUERY_KEY],
    queryFn: getExchangeInfo,
  });
}
