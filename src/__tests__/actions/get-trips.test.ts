import { getTrips } from "@/lib/actions/get-trips.actions";

describe("getTrips", () => {
  const mockFetch = jest.fn();
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  global.fetch = mockFetch;
  
  beforeEach(() => {
    mockFetch.mockClear();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it("should fetch trips successfully", async () => {
    const mockTrips = [
      {
        id: 1,
        title: "Trip to Italy",
        description: "Amazing trip to Italy",
        photo_url: "https://example.com/photo.jpg",
        status: "todo",
        itinerary: [
          {
            day: 1,
            description: "Visit Colosseum",
            location: "Rome"
          }
        ]
      }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTrips
    });

    const result = await getTrips({ status: "todo" });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockTrips);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("should handle API errors gracefully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const result = await getTrips({ status: "todo" });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching trips:",
      expect.any(Error)
    );
  });

  it("should handle network errors gracefully", async () => {
    const networkError = new Error("Network error");
    mockFetch.mockRejectedValueOnce(networkError);

    const result = await getTrips({ status: "todo" });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching trips:",
      networkError
    );
  });

  it("should construct URL correctly with status parameter", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    await getTrips({ status: "done" });

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("?status=done"));
    expect(consoleSpy).not.toHaveBeenCalled();
  });
}); 