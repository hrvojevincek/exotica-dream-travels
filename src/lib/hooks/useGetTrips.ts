import { getTrips } from "@/lib/actions/getTrips";
import { Trip } from "@/types/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useGetTrips() {
  const [data, setData] = useState<Trip[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const status = usePathname().split("/")[1];

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const trips = await getTrips({ status: status });

        setData(trips);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, [status]);

  return { data, isLoading, error };
}
