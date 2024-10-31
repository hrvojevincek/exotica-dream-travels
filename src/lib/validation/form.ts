import { z } from "zod";

const itinerarySchema = z.object({
  day: z.number(),
  description: z.string(),
  location: z.string(),
});

export const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Title should be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters long")
    .optional()
    .or(z.literal("")),
  photo_url: z.string().url("Invalid photo URL").optional().or(z.literal("")),
  status: z.enum(["todo", "done"]).default("todo"),
  itinerary: z.array(itinerarySchema),
});

export type FormSchema = z.infer<typeof formSchema>;
