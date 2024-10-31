export interface Itinerary {
  day: number;
  description: string;
  location: string;
}

export interface Trip {
  description: string;
  id: number;
  itinerary: Itinerary[];
  photo_url: string;
  status: "todo" | "done";
  title: string;
}
