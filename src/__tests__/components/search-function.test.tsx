import { render, screen } from "@testing-library/react";
import TripList from "@/components/layout/trips-list";
import { useGetTrips } from "@/lib/hooks/use-get-trips";
import { SearchProvider } from "@/lib/context/search-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { userEvent } from "@testing-library/user-event";
import SearchTrip from "@/components/layout/search-trip";
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

describe("Search Functionality", () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetTrips.mockReturnValue({
      isLoading: false,
      data: mockTrips,
      isError: false,
      error: null,
    });
  });

  it("filters trips based on search query", async () => {
    const user = userEvent.setup();

    render(
      <>
        <SearchTrip />
        <TripList />
      </>,
      { wrapper: createWrapper() }
    );

    // Initially shows all trips
    expect(screen.getByText("Trip to Paris")).toBeInTheDocument();
    expect(screen.getByText("Trip to London")).toBeInTheDocument();

    // Search for "Paris"
    const searchInput = screen.getByPlaceholderText("Search trips");
    await user.type(searchInput, "Paris");

    // Should only show Paris trip
    expect(screen.getByText("Trip to Paris")).toBeInTheDocument();
    expect(screen.queryByText("Trip to London")).not.toBeInTheDocument();
  });

  it("shows no results message when search has no matches", async () => {
    const user = userEvent.setup();

    render(
      <>
        <SearchTrip />
        <TripList />
      </>,
      { wrapper: createWrapper() }
    );

    // Search for non-existent trip
    const searchInput = screen.getByPlaceholderText("Search trips");
    await user.type(searchInput, "Tokyo");

    expect(
      screen.getByText("No trips found matching your search")
    ).toBeInTheDocument();
    expect(screen.queryByText("Trip to Paris")).not.toBeInTheDocument();
    expect(screen.queryByText("Trip to London")).not.toBeInTheDocument();
  });

  it("searches through trip descriptions", async () => {
    const user = userEvent.setup();

    render(
      <>
        <SearchTrip />
        <TripList />
      </>,
      { wrapper: createWrapper() }
    );

    const searchInput = screen.getByPlaceholderText("Search trips");
    await user.type(searchInput, "Amazing");

    expect(screen.getByText("Trip to Paris")).toBeInTheDocument();
    expect(screen.queryByText("Trip to London")).not.toBeInTheDocument();
  });

  it("searches through trip itinerary locations", async () => {
    const user = userEvent.setup();

    render(
      <>
        <SearchTrip />
        <TripList />
      </>,
      { wrapper: createWrapper() }
    );

    const searchInput = screen.getByPlaceholderText("Search trips");
    await user.type(searchInput, "Big Ben");

    expect(screen.queryByText("Trip to Paris")).not.toBeInTheDocument();
    expect(screen.getByText("Trip to London")).toBeInTheDocument();
  });

  it("is case insensitive", async () => {
    const user = userEvent.setup();

    render(
      <>
        <SearchTrip />
        <TripList />
      </>,
      { wrapper: createWrapper() }
    );

    const searchInput = screen.getByPlaceholderText("Search trips");
    await user.type(searchInput, "paris");

    expect(screen.getByText("Trip to Paris")).toBeInTheDocument();
    expect(screen.queryByText("Trip to London")).not.toBeInTheDocument();
  });
});
