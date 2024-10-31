import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrip } from "../actions/delete-trip.actions";

interface DeleteTripOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useDeleteTrip({ onSuccess, onError }: DeleteTripOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
      console.error("Failed to delete trip:", error);
    },
  });
}
