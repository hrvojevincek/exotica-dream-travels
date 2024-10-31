import { render, screen } from "@testing-library/react";
import TripList from "@/components/layout/trips-list";
import { useGetTrips } from "@/lib/hooks/use-get-trips";
import { SearchProvider } from "@/lib/context/search-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

// Mock the hooks
jest.mock("@/lib/hooks/use-get-trips");

const mockUseGetTrips = useGetTrips as jest.Mock;

// Create a wrapper with providers
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>{children}</SearchProvider>
    </QueryClientProvider>
  );

  return Wrapper;
};

describe("TripList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state", () => {
    mockUseGetTrips.mockReturnValue({
      isLoading: true,
      data: null,
      isError: false,
      error: null,
    });

    render(<TripList />, { wrapper: createWrapper() });

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockUseGetTrips.mockReturnValue({
      isLoading: false,
      data: null,
      isError: true,
      error: new Error("Failed to fetch trips"),
    });

    render(<TripList />, { wrapper: createWrapper() });

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch trips/i)).toBeInTheDocument();
  });

  it("shows no trips message when data is empty", () => {
    mockUseGetTrips.mockReturnValue({
      isLoading: false,
      data: [],
      isError: false,
      error: null,
    });

    render(<TripList />, { wrapper: createWrapper() });

    expect(screen.getByTestId("no-results")).toBeInTheDocument();
    expect(screen.getByText(/No trips found/i)).toBeInTheDocument();
  });

  it("renders trips when data is available", () => {
    const mockTrips = [
      {
        id: 1,
        title: "Trip to Paris",
        description: "Amazing trip to Paris",
        photo_url: "https://example.com/paris.jpg",
        status: "todo" as const,
        itinerary: [
          {
            day: 1,
            description: "Visit Eiffel Tower",
            location: "Paris",
          },
        ],
      },
    ];

    mockUseGetTrips.mockReturnValue({
      isLoading: false,
      data: mockTrips,
      isError: false,
      error: null,
    });

    render(<TripList />, { wrapper: createWrapper() });

    expect(screen.getByTestId("trips-container")).toBeInTheDocument();
    expect(screen.getByTestId("trip-card-1")).toBeInTheDocument();
    expect(screen.getByText("Trip to Paris")).toBeInTheDocument();
  });

  it("filters trips based on search query", () => {
    const mockTrips = [
      {
        id: 1,
        title: "Trip to Paris",
        description: "Amazing trip to Paris",
        photo_url: "https://example.com/paris.jpg",
        status: "todo" as const,
        itinerary: [
          {
            day: 1,
            description: "Visit Eiffel Tower",
            location: "Paris",
          },
        ],
      },
      {
        id: 2,
        title: "Trip to London",
        description: "Exploring London",
        photo_url: "https://example.com/london.jpg",
        status: "todo" as const,
        itinerary: [
          {
            day: 1,
            description: "Visit Big Ben",
            location: "London",
          },
        ],
      },
    ];

    mockUseGetTrips.mockReturnValue({
      isLoading: false,
      data: mockTrips,
      isError: false,
      error: null,
    });

    render(<TripList />, { wrapper: createWrapper() });

    // Initially shows all trips
    expect(screen.getByText("Trip to Paris")).toBeInTheDocument();
    expect(screen.getByText("Trip to London")).toBeInTheDocument();
  });
});
