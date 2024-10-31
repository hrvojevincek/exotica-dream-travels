import { updateTrip } from "@/lib/actions/update-trip.action";
import { FormSchema } from "@/lib/validation/form";

describe("updateTrip", () => {
  const mockFetch = jest.fn();
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  const mockValidTripData: FormSchema = {
    id: 1,
    title: "Updated Trip to Paris",
    description: "An amazing journey through Paris",
    photo_url: "https://example.com/paris.jpg",
    status: "todo",
    itinerary: [
      {
        day: 1,
        description: "Visit Eiffel Tower",
        location: "Paris",
      },
    ],
  };

  it("should successfully update a trip", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockValidTripData, id: 1 }),
    });

    const result = await updateTrip(mockValidTripData);

    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.API_URL}/1`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(mockValidTripData),
      })
    );
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ ...mockValidTripData, id: 1 });
  });

  it("should handle validation errors", async () => {
    const invalidData = {
      id: 1,
      title: "a", // Too short, should be min 3 chars
      description: "short", // Too short, should be min 10 chars
      status: "invalid" as "todo" | "done", // Invalid status
      itinerary: [],
    };

    const result = await updateTrip(invalidData);

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.error).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.any(String),
        }),
      ])
    );
  });

  it("should handle API errors", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await updateTrip(mockValidTripData);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to update trip");
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should handle network errors", async () => {
    const networkError = new Error("Network error");
    mockFetch.mockRejectedValueOnce(networkError);

    const result = await updateTrip(mockValidTripData);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to update trip");
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to update trip:",
      networkError
    );
  });

  it("should validate all required fields", async () => {
    const incompleteData = {
      id: 1,
      title: "Updated Trip",
      // missing other required fields
    };

    const result = await updateTrip(incompleteData);

    expect(result.success).toBe(false);
    expect(result.error).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.any(String),
        }),
      ])
    );
  });

  it("should handle partial updates correctly", async () => {
    const partialUpdate = {
      id: 1,
      title: "Updated Title Only",
      description: "Updated description that is long enough",
      status: "done" as const,
      itinerary: [
        {
          day: 1,
          description: "Updated day description",
          location: "New Location",
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...partialUpdate, id: 1 }),
    });

    const result = await updateTrip(partialUpdate);

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ ...partialUpdate, id: 1 });
  });
});
