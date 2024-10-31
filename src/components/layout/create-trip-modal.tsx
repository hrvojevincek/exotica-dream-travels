"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { type FormSchema, formSchema } from "@/lib/validation/form";

import { useCreateTrip } from "@/lib/hooks/use-create-trip";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Component({ isOpen, onClose }: CreateTripModalProps) {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      photo_url: "",
      status: "todo",
      itinerary: [{ day: 1, location: "", description: "" }],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const createTrip = useCreateTrip({
    onSuccess: () => {
      form.reset();
      onClose();
      toast.success("Trip created successfully");
      router.push("/todo");
    },
    onError: (error) => {
      console.error("Failed to create trip:", error);
      toast.error("Failed to create trip");
    },
  });

  const onSubmitForm = (data: FormSchema) => {
    createTrip.mutate(data);
  };

  const handleAddItineraryItem = () => {
    const currentItinerary = form.getValues("itinerary");
    form.setValue("itinerary", [
      ...currentItinerary,
      {
        day: currentItinerary.length + 1,
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

        <div className="flex-1 overflow-y-auto px-1 rounded-xl">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="space-y-1">
              <Label htmlFor="title">Name</Label>
              <Input id="title" placeholder="Italy" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Discover the wonders of the Roman empire..."
                className="min-h-[100px]"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="photo_url">Image URL</Label>
              <Input
                id="photo_url"
                placeholder="Image URL"
                {...register("photo_url")}
              />
              {errors.photo_url && (
                <p className="text-red-500 text-sm">
                  {errors.photo_url.message}
                </p>
              )}
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

              {form.watch("itinerary").map((item, index) => (
                <div
                  key={index}
                  className="space-y-4 rounded-lg bg-[#F3F3F3] p-4 border-black"
                >
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <Controller
                        control={control}
                        name={`itinerary.${index}.day`}
                        render={({ field }) => (
                          <Select
                            value={field.value.toString()}
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                          >
                            <SelectTrigger id={`day-${index}`}>
                              <SelectValue
                                className="text-black"
                                placeholder="Day"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              {Array.from({ length: 7 }, (_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={(i + 1).toString()}
                                >
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <div>
                        <Input
                          {...register(`itinerary.${index}.location`)}
                          placeholder="Location"
                          className="bg-white border border-[#B0B0B0]"
                        />
                      </div>
                      <div>
                        <Textarea
                          {...register(`itinerary.${index}.description`)}
                          placeholder="Description"
                          className="bg-white border border-[#B0B0B0] h-28"
                        />
                      </div>
                    </div>
                  </div>
                  {errors.itinerary?.[index] && (
                    <p className="text-red-500 text-sm">
                      {Object.values(
                        errors.itinerary[index] as Record<
                          string,
                          { message: string }
                        >
                      )
                        .map((error) => error.message)
                        .join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button className="h-12 w-40 rounded-full" type="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
