"use client";

import { useGetTrips } from "@/lib/hooks/useGetTrips";
import TripCard from "./trip-card";
import Loader from "../loader";
import Error from "../error";
import NoTrips from "../no-trips";

const TripList = () => {
  const { data: trips, isLoading, isError, error } = useGetTrips();

  if (isLoading) return <Loader />;
  if (isError) return <Error error={error} />;
  if (!trips) return <NoTrips />;

  return (
    <div className="flex flex-col gap-4 mt-6">
      {trips.map((trip, index) => (
        <TripCard key={`${trip.id}-${index}`} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
