"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Component({ isOpen, onClose }: CreateTripModalProps) {
  const [itineraryItems, setItineraryItems] = useState([
    { day: "", location: "", description: "" },
  ]);

  const handleAddItineraryItem = () => {
    setItineraryItems([
      ...itineraryItems,
      {
        day: (itineraryItems.length + 1).toString(),
        location: "",
        description: "",
      },
    ]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[500px] w-[650px] flex flex-col h-full sm:h-[85vh]"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-[32px] font-normal">
            Create a trip
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1 rounded-xl ">
          <form className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Italy" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="introduction">
                Introduction (max. 240 characters)
              </Label>
              <Textarea
                id="description"
                placeholder="Discover the wonders of the Roman empire..."
                className="min-h-16"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Discover the wonders of the Roman empire..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="image">Image</Label>
              <Input id="image" placeholder="Image URL" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label>Day by day itinerary</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleAddItineraryItem}
                >
                  <Plus className="h-4 w-4 border rounded-full border-black" />
                </Button>
              </div>

              {itineraryItems.map((item, index) => (
                <div
                  key={index}
                  className="space-y-4 rounded-lg bg-[#F3F3F3] p-4 border-black"
                >
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <Select defaultValue={item.day}>
                        <SelectTrigger id={`day-${index}`}>
                          <SelectValue
                            className="text-black"
                            placeholder="Day"
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {Array.from({ length: 7 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <div>
                        <Input
                          id={`location-${index}`}
                          placeholder="Location"
                          className="bg-white border border-[#B0B0B0]"
                        />
                      </div>
                      <div>
                        <Textarea
                          id={`description-${index}`}
                          placeholder="Description"
                          className="bg-white border border-[#B0B0B0] h-28"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="flex justify-end">
          <DialogClose asChild>
            <Button className="h-12 w-40 rounded-full" type="submit">
              Save
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
