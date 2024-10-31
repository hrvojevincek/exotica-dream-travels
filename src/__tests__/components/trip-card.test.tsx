import { render, screen, fireEvent } from "@testing-library/react";
import TripCard from "@/components/layout/trip-card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the delete trip hook
jest.mock("@/lib/hooks/use-delete-trip", () => ({
  useDeleteTrip: () => ({
    mutate: jest.fn(),
    isLoading: false,
  }),
}));

const mockTrip = {
  id: 1,
  title: "Test Trip",
  description: "Test Description",
  photo_url: "https://example.com/test.jpg",
  status: "todo" as const,
  itinerary: [
    {
      day: 1,
      description: "Test Day",
      location: "Test Location",
    },
  ],
};

describe("TripCard", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("renders trip details correctly", () => {
    render(<TripCard trip={mockTrip} />, { wrapper });

    expect(screen.getByText("Test Trip")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("See trip details")).toBeInTheDocument();
  });

  it("opens edit modal when edit button is clicked", () => {
    render(<TripCard trip={mockTrip} />, { wrapper });

    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByText("Edit trip")).toBeInTheDocument();
  });

  it("shows delete confirmation dialog", () => {
    render(<TripCard trip={mockTrip} />, { wrapper });

    fireEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This action cannot be undone. This will permanently delete your trip."
      )
    ).toBeInTheDocument();
  });
});
