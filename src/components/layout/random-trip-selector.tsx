"use client";

import { useGetTrips } from "@/lib/hooks/use-get-trips";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Trip } from "@/types/types";
import { Shuffle } from "lucide-react";
import {
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  addMonths,
} from "date-fns";

interface SavedTripData {
  trip: Trip;
  startDate: string;
}

interface CountdownTime {
  months: number;
  days: number;
  hours: number;
}

export default function RandomTripSelector() {
  const { data: trips } = useGetTrips();
  const [selectedTrip, setSelectedTrip] = useState<SavedTripData | null>(null);
  const [countdown, setCountdown] = useState<CountdownTime | null>(null);

  useEffect(() => {
    // Load saved trip data from localStorage
    const savedData = localStorage.getItem("selectedRandomTrip");
    if (savedData) {
      setSelectedTrip(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (selectedTrip) {
      const updateCountdown = () => {
        const now = new Date();
        const startDate = new Date(selectedTrip.startDate);

        // If the trip date has passed, clear the selection
        if (startDate < now) {
          setSelectedTrip(null);
          setCountdown(null);
          localStorage.removeItem("selectedRandomTrip");
          return;
        }

        // Calculate months first
        const months = differenceInMonths(startDate, now);

        // Calculate remaining days after months
        const afterMonths = addMonths(now, months);
        const days = differenceInDays(startDate, afterMonths);

        // Calculate remaining hours after days
        const afterDays = new Date(afterMonths);
        afterDays.setDate(afterDays.getDate() + days);
        const hours = differenceInHours(startDate, afterDays);

        setCountdown({ months, days, hours });
      };

      updateCountdown();
      const timer = setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour

      return () => clearInterval(timer);
    }
  }, [selectedTrip]);

  const handleRandomSelect = () => {
    if (!trips || trips.length === 0) return;

    const randomIndex = Math.floor(Math.random() * trips.length);
    const selectedTrip = trips[randomIndex];
    const startDate = addMonths(new Date(), 3).toISOString();

    const tripData = { trip: selectedTrip, startDate };
    setSelectedTrip(tripData);
    localStorage.setItem("selectedRandomTrip", JSON.stringify(tripData));
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <Button
        onClick={handleRandomSelect}
        className="bg-black text-white hover:bg-black/80"
      >
        <Shuffle className="w-4 h-4" />
        Pick Random Trip
      </Button>

      {selectedTrip && countdown && (
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{selectedTrip.trip.title}</h3>
          <div className="flex gap-4 justify-center">
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 min-w-[100px]">
              <span className="text-2xl font-bold">{countdown.months}</span>
              <span className="text-sm text-gray-600">
                {countdown.months === 1 ? "Month" : "Months"}
              </span>
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 min-w-[100px]">
              <span className="text-2xl font-bold">{countdown.days}</span>
              <span className="text-sm text-gray-600">
                {countdown.days === 1 ? "Day" : "Days"}
              </span>
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 min-w-[100px]">
              <span className="text-2xl font-bold">{countdown.hours}</span>
              <span className="text-sm text-gray-600">
                {countdown.hours === 1 ? "Hour" : "Hours"}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            until your adventure begins!
          </p>
        </div>
      )}
    </div>
  );
}
