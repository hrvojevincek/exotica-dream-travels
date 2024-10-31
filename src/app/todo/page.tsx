import FilterTrip from "@/components/layout/filter-trip";
import TripList from "@/components/layout/trips-list";

export default async function TodoPage() {
  return (
    <main>
      <FilterTrip />
      <TripList />
    </main>
  );
}
