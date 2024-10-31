import { deleteTrip } from "@/lib/actions/delete-trip.actions";

describe("deleteTrip", () => {
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

  it("should successfully delete a trip", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
    });

    const result = await deleteTrip(1);

    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.API_URL}/1`,
      expect.objectContaining({
        method: "DELETE",
      })
    );
    expect(result.success).toBe(true);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("should handle API errors", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await deleteTrip(1);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to delete trip");
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to delete trip:",
      expect.any(Error)
    );
  });

  it("should handle network errors", async () => {
    const networkError = new Error("Network error");
    mockFetch.mockRejectedValueOnce(networkError);

    const result = await deleteTrip(1);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to delete trip");
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to delete trip:",
      networkError
    );
  });

  it("should call the correct endpoint with trip ID", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
    });

    await deleteTrip(123);

    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.API_URL}/123`,
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });
});
