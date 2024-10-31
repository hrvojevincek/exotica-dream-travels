"use server";

import { formSchema, FormSchema } from "../validation/form";
import { z } from "zod";

export const transformZodErrors = (error: z.ZodError) => {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
};

export async function updateTrip(formData: Partial<FormSchema>) {
  try {
    const validatedFields = formSchema.parse({
      id: formData.id,
      title: formData.title,
      description: formData.description,
      photo_url: formData.photo_url,
      status: formData.status,
      itinerary: formData.itinerary,
    });

    const response = await fetch(`${process.env.API_URL}/${formData.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
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
