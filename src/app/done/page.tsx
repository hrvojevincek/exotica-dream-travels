import FilterTrip from "@/components/layout/filter-trip";
import TripList from "@/components/layout/trips-list";


export default async function DonePage() {
  return (
    <main>
      <FilterTrip />
      <TripList />
    </main>
  );
}
