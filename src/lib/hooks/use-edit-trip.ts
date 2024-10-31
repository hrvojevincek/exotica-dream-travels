import { useMutation } from "@tanstack/react-query";
import { FormSchema } from "@/lib/validation/form";
import { updateTrip } from "../actions/update-trip.action";

interface EditTripOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useEditTrip({ onSuccess, onError }: EditTripOptions) {
  return useMutation({
    mutationFn: (data: FormSchema) => updateTrip(data),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
      console.error("Failed to update trip:", error);
    },
  });
}
