"use server";

import { formSchema, FormSchema } from "../validation/form";
import { z } from "zod";

export const transformZodErrors = (error: z.ZodError) => {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
};

export async function createTrip(formData: FormSchema) {
  try {
    const validatedFields = formSchema.parse({
      title: formData.title,
      description: formData.description,
      photo_url: formData.photo_url,
      status: formData.status,
      itinerary: formData.itinerary,
    });

    const response = await fetch(`${process.env.API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: validatedFields,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const trip = await response.json();
    console.log("Trip created successfully:", trip);
    return { success: true, data: trip };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: transformZodErrors(error) };
    }
    console.error("Failed to create trip:", error);
    return { success: false, error: "Failed to create trip" };
  }
}
