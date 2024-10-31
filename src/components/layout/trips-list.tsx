"use client";

import { useGetTrips } from "@/lib/hooks/use-get-trips";
import TripCard from "./trip-card";
import Loader from "../loader";
import Error from "../error";
import NoTrips from "../no-trips";
import { useSearch } from "@/lib/context/search-context";
import { Trip } from "@/types/types";

const TripList = () => {
  const { data: trips, isLoading, isError, error } = useGetTrips();
  const { searchQuery } = useSearch();

  if (isLoading) return <Loader />;
  if (isError) return <Error error={error} />;
  if (!trips) return <NoTrips />;

  const filteredTrips = filterTrips(trips, searchQuery);

  if (filteredTrips.length === 0) {
    return (
      <div className="h-24 mt-6 w-full flex items-center justify-center">
        <h1 className="text-xl">No trips found matching your search</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      {filteredTrips.map((trip, index) => (
        <TripCard key={`${trip.id}-${index}`} trip={trip} />
      ))}
    </div>
  );
};

function filterTrips(trips: Trip[], searchQuery: string): Trip[] {
  if (!searchQuery) return trips;

  const query = searchQuery.toLowerCase();
  return trips.filter((trip) => {
    const matchesTitle = trip.title.toLowerCase().includes(query);
    const matchesDescription = trip.description.toLowerCase().includes(query);
    const matchesItinerary = trip.itinerary.some(
      (item) =>
        item.location.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    return matchesTitle || matchesDescription || matchesItinerary;
  });
}

export default TripList;
