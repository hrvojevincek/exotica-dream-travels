"use client";

import { useGetTrips } from "@/lib/hooks/useGetTrips";
import TripCard from "./trip-card";
import { Loader } from "lucide-react";

const TripList = () => {
  const { data: trips, isLoading, error } = useGetTrips();

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!trips) return <div>No trips found</div>;

  return (
    <div className="flex flex-col gap-4 mt-6">
      {trips.map((trip, index) => (
        <TripCard key={`${trip.id}-${index}`} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
