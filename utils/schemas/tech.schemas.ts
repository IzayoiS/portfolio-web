"use client";

import { z } from "zod";

export const formTechSchema = z.object({
  name: z.string().min(1),
  icon: z.any().nullable(),
});

export type FormTechSchemaDTO = z.infer<typeof formTechSchema>;
