import { render, screen } from "@testing-library/react";
import { OrderbookDisplay } from "../OrderbookDisplay";
import { useOrderbookWebSocket } from "@/hooks/useOrderbookWebSocket";
import { mockOrderbookData } from "@/__mocks__/orderbookData";
import { ERROR_MESSAGES } from "@/constants/messages";

jest.mock("@/hooks/useOrderbookWebSocket");

const mockUseOrderbookWebSocket = useOrderbookWebSocket as jest.MockedFunction<
  typeof useOrderbookWebSocket
>;

describe("OrderbookDisplay", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when initially loading", () => {
    mockUseOrderbookWebSocket.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      isConnected: false,
    });

    render(<OrderbookDisplay symbol="BTCUSDT" />);

    expect(screen.getByTestId("orderbook-loading")).toBeInTheDocument();
  });

  it("renders error state when initially failing", () => {
    mockUseOrderbookWebSocket.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error(ERROR_MESSAGES.FAILED_TO_LOAD_ORDERBOOK),
      isConnected: false,
    });

    render(<OrderbookDisplay symbol="BTCUSDT" />);

    expect(screen.getByTestId("orderbook-error")).toBeInTheDocument();
  });

  it("renders empty state when no data available", () => {
    mockUseOrderbookWebSocket.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      isConnected: false,
    });

    render(<OrderbookDisplay symbol="BTCUSDT" />);

    expect(screen.getByTestId("orderbook-empty")).toBeInTheDocument();
  });

  it("renders orderbook with data successfully", () => {
    mockUseOrderbookWebSocket.mockReturnValue({
      data: mockOrderbookData,
      isLoading: false,
      error: null,
      isConnected: true,
    });

    render(<OrderbookDisplay symbol="BTCUSDT" />);

    expect(screen.getByText(/Orderbook - BTCUSDT/i)).toBeInTheDocument();
    expect(screen.getByText(/Last update:/i)).toBeInTheDocument();
  });

  it("calculates and displays spread correctly", () => {
    mockUseOrderbookWebSocket.mockReturnValue({
      data: mockOrderbookData,
      isLoading: false,
      error: null,
      isConnected: true,
    });

    render(<OrderbookDisplay symbol="BTCUSDT" />);

    // Best bid: 95000, Best ask: 95001 (último ask después del reverse)
    // Spread: 95001 - 95000 = 1
    // Spread %: (1 / 95000) * 100 = 0.00105...%
    expect(screen.getByText(/Spread:/i)).toBeInTheDocument();
    expect(screen.getByText(/1.00 \(0.001%\)/)).toBeInTheDocument();
  });

  it("displays best bid and best ask prices", () => {
    mockUseOrderbookWebSocket.mockReturnValue({
      data: mockOrderbookData,
      isLoading: false,
      error: null,
      isConnected: true,
    });

    render(<OrderbookDisplay symbol="BTCUSDT" />);

    // Best bid: 95000, Best ask: 95001 (después del reverse)
    const bestBidElements = screen.getAllByText("95000.00");
    const bestAskElements = screen.getAllByText("95001.00");

    expect(bestBidElements.length).toBeGreaterThan(0);
    expect(bestAskElements.length).toBeGreaterThan(0);
  });

  it("handles orderbook with zero spread correctly", () => {
    const samePrice = {
      lastUpdateId: 123,
      bids: [["100.00", "1.0"] as [string, string]],
      asks: [["100.00", "1.0"] as [string, string]],
    };

    mockUseOrderbookWebSocket.mockReturnValue({
      data: samePrice,
      isLoading: false,
      error: null,
      isConnected: true,
    });

    render(<OrderbookDisplay symbol="BTCUSDT" />);

    expect(screen.getByText(/0.00 \(0.000%\)/)).toBeInTheDocument();
  });

  it("renders column headers correctly", () => {
    mockUseOrderbookWebSocket.mockReturnValue({
      data: mockOrderbookData,
      isLoading: false,
      error: null,
      isConnected: true,
    });

    render(<OrderbookDisplay symbol="BTCUSDT" />);

    expect(screen.getByText(/Price \(USDT\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByText(/Total/i)).toBeInTheDocument();
  });
});
