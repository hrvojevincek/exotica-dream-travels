"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TripDetailsModal from "./trip-details-modal";
import CreateTripModal from "./create-trip-modal";
import { Trip } from "@/types/types";
import { useDeleteTrip } from "@/lib/hooks/use-delete-trip";
import { toast } from "sonner";
import AlertModal from "../alert-modal";

export default function TripCard({ trip }: { trip: Trip }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteTrip = useDeleteTrip({
    onSuccess: () => {
      toast.success("Trip deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete trip");
    },
  });

  const handleDelete = () => {
    deleteTrip.mutate(trip.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card
        data-testid={`trip-card-${trip.id}`}
        className="flex h-[206px] overflow-hidden shadow-none hover:shadow-md"
      >
        <div className="relative w-1/2">
          {trip.photo_url ? (
            <Image
              src={trip.photo_url}
              alt={trip.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold">{trip.title}</h3>
          <p className="text-base mt-2 flex-1 truncate">{trip.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <Link
                className="underline"
                href="#"
                prefetch={false}
                onClick={() => setIsModalOpen(true)}
              >
                See trip details
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="underline bg-white text-base text-black shadow-none border-none"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                className="text-red-500 text-base bg-white underline shadow-none border-none"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <TripDetailsModal
        id={trip.id}
        status={trip.status}
        photo_url={trip.photo_url}
        title={trip.title}
        description={trip.description}
        itinerary={trip.itinerary}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <CreateTripModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={trip}
        mode="edit"
      />

      <AlertModal
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleDelete={handleDelete}
      />
    </>
  );
}
