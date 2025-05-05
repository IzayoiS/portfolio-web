"use client";

import { z } from "zod";

export const formExpSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  startMonth: z.string().min(1),
  startYear: z.string().min(1),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
  isCurrentlyWorking: z.boolean(),
  descriptions: z.array(z.string().min(1)),
  logo: z.any().nullable(),
});

export type FormExpSchemaDTO = z.infer<typeof formExpSchema>;
