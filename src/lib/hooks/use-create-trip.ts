import { useMutation } from "@tanstack/react-query";
import { type FormSchema } from "@/lib/validation/form";
import { createTrip } from "@/lib/actions/create-trip.actions";

interface UseCreateTripOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useCreateTrip({
  onSuccess,
  onError,
}: UseCreateTripOptions = {}) {
  return useMutation({
    mutationFn: (data: FormSchema) => createTrip(data),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
      console.error("Failed to create trip:", error);
    },
  });
}
