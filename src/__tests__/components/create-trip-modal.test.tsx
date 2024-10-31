import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateTripModal from "@/components/layout/create-trip-modal";
import { useCreateTrip } from "@/lib/hooks/use-create-trip";
import { useEditTrip } from "@/lib/hooks/use-edit-trip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the hooks
jest.mock("@/lib/hooks/use-create-trip");
jest.mock("@/lib/hooks/use-edit-trip");
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

const mockCreateTrip = useCreateTrip as jest.Mock;
const mockEditTrip = useEditTrip as jest.Mock;

// Create a wrapper with providers
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = "TestWrapper";
  return Wrapper;
};

describe("CreateTripModal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateTrip.mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    });
    mockEditTrip.mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    });
  });

  it("renders create trip modal correctly", () => {
    render(
      <CreateTripModal isOpen={true} onClose={mockOnClose} mode="create" />,
      {
        wrapper: createWrapper(),
      }
    );

    expect(screen.getByText("Create a trip")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Image URL")).toBeInTheDocument();
    expect(screen.getByText("Day by day itinerary")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("renders edit trip modal correctly with initial data", () => {
    const initialData = {
      id: 1,
      title: "Test Trip",
      description: "Test Description",
      photo_url: "https://example.com/image.jpg",
      status: "todo" as const,
      itinerary: [
        {
          day: 1,
          location: "Test Location",
          description: "Test Day Description",
        },
      ],
    };

    render(
      <CreateTripModal
        isOpen={true}
        onClose={mockOnClose}
        mode="edit"
        initialData={initialData}
      />,
      {
        wrapper: createWrapper(),
      }
    );

    expect(screen.getByText("Edit trip")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Trip")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("https://example.com/image.jpg")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  it("handles form submission for create mode", async () => {
    const mockMutate = jest.fn();
    mockCreateTrip.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });

    render(
      <CreateTripModal isOpen={true} onClose={mockOnClose} mode="create" />,
      {
        wrapper: createWrapper(),
      }
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "New Trip" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New Trip Description" },
    });
    fireEvent.change(screen.getByLabelText("Image URL"), {
      target: { value: "https://example.com/new-image.jpg" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "New Trip",
          description: "New Trip Description",
          photo_url: "https://example.com/new-image.jpg",
        })
      );
    });
  });

  it("handles form submission for edit mode", async () => {
    const mockMutate = jest.fn();
    mockEditTrip.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });

    const initialData = {
      id: 1,
      title: "Test Trip",
      description: "Test Description",
      photo_url: "https://example.com/image.jpg",
      status: "todo" as const,
      itinerary: [
        {
          day: 1,
          location: "Test Location",
          description: "Test Day Description",
        },
      ],
    };

    render(
      <CreateTripModal
        isOpen={true}
        onClose={mockOnClose}
        mode="edit"
        initialData={initialData}
      />,
      {
        wrapper: createWrapper(),
      }
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Updated Trip" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          title: "Updated Trip",
        })
      );
    });
  });
});
