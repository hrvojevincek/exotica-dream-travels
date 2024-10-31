"use server";

import { Trip } from "@/types/types";

export async function getTrips({
  status,
}: {
  status: string;
}): Promise<Trip[]> {
  try {
    const baseUrl = process.env.API_URL as string;

    const url = status ? `${baseUrl}?status=${status}` : baseUrl;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trips:", error);
    return [];
  }
}
