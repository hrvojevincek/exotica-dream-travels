import { getTrips } from "@/lib/actions/getTrips";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export function useGetTrips() {
  const pathname = usePathname();
  const status = pathname.split("/")[1];

  return useQuery({
    queryKey: ["trips", status],
    queryFn: () => getTrips({ status }),
  });
}
