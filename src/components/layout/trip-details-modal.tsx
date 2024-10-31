import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import TimelineItem from "./timeline-item";
import { Itinerary } from "@/types/types";
import { useEditTrip } from "@/lib/hooks/use-edit-trip";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TripDetailsModalProps {
  photo_url: string;
  title: string;
  status: string;
  description: string;
  itinerary: Itinerary[];
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

const TripDetailsModal = ({
  photo_url,
  title,
  status,
  description,
  itinerary,
  isOpen,
  onClose,
  id,
}: TripDetailsModalProps) => {
  const editTrip = useEditTrip({
    onSuccess: () => {
      onClose();

      toast.success("Trip status updated");
    },
    onError: (error) => {
      console.error("Failed to update trip status:", error);
      toast.error("Failed to update trip status");
    },
  });

  const handleComplete = () => {
    const newStatus = status === "done" ? "todo" : "done";

    editTrip.mutate({
      id,
      status: newStatus,
      title,
      itinerary,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
      aria-labelledby="trip-details-title"
      aria-describedby="trip-details-description"
    >
      <DialogContent
        className="sm:max-w-[600px] h-[85vh] overflow-hidden flex flex-col p-0"
        aria-describedby={undefined}
        aria-labelledby={undefined}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="relative w-full h-[250px]">
            <Image
              alt={title}
              className="object-cover"
              fill
              src={photo_url}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-7 pt-3">
            <DialogTitle className="text-[32px] font-normal">
              {title}
            </DialogTitle>
            <div className="flex items-center text-muted-foreground gap-2 cursor-pointer">
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <CircleCheck
                  className={cn(
                    "size-6",
                    status === "done" && "fill-green-500 text-white"
                  )}
                  aria-hidden="true"
                />
                <span className="text-base">
                  {status === "done" ? "Complete" : "Mark as completed"}
                </span>
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <p className="text-base">{description}</p>

              <Separator className="my-6" />

              <div className="space-y-5">
                <h3 className="text-2xl">Itinerary</h3>
                <div>
                  {itinerary.map((item, index) => (
                    <TimelineItem
                      key={item.day}
                      day={item.day}
                      location={item.location}
                      description={item.description}
                      isLast={index === itinerary.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TripDetailsModal;
