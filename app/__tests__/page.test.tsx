import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../page";
import { useGetExchangeInfo } from "@/hooks/useGetExhangeInfo";
import { mockExchangeInfoData } from "@/__mocks__/exchangeInfoData";
import { ERROR_MESSAGES, LOADING_MESSAGES } from "@/constants/messages";

jest.mock("@/hooks/useGetExhangeInfo");
jest.mock("@/hooks/useOrderbookWebSocket", () => ({
  useOrderbookWebSocket: jest.fn(() => ({
    data: {
      lastUpdateId: 123,
      bids: [["95000", "1"]],
      asks: [["95100", "1"]],
    },
    isLoading: false,
    error: null,
    isConnected: true,
  })),
}));

const mockUseGetExchangeInfo = useGetExchangeInfo as jest.MockedFunction<
  typeof useGetExchangeInfo
>;

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetExchangeInfo.mockReturnValue({
      data: mockExchangeInfoData,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetExchangeInfo>);
  });

  it("changes symbol when selecting another asset", async () => {
    render(<Home />);

    const select = screen.getByRole("combobox");

    fireEvent.change(select, {
      target: { value: "ETHUSDT" },
    });

    const ethElements = await screen.findAllByText(/ETHUSDT/);
    expect(ethElements.length).toBeGreaterThan(0);
  });

  it("shows loading state while exchange info is loading", () => {
    mockUseGetExchangeInfo.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as unknown as ReturnType<typeof useGetExchangeInfo>);

    render(<Home />);

    expect(
      screen.getByText(LOADING_MESSAGES.LOADING_TRADING_PAIRS),
    ).toBeInTheDocument();
  });
  it("shows error state when the service fails", () => {
    mockUseGetExchangeInfo.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error(ERROR_MESSAGES.ERROR_EXCHANGE_INFO),
    } as unknown as ReturnType<typeof useGetExchangeInfo>);

    render(<Home />);

    expect(
      screen.getByText(ERROR_MESSAGES.ERROR_EXCHANGE_INFO),
    ).toBeInTheDocument();
  });
});
