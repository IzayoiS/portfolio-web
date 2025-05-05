"use client";

import { z } from "zod";

export const formProjectSchema = z.object({
  projectName: z.string().min(1),
  descriptions: z.array(z.string().min(1)),
  techStack: z.string().min(4),
  linkGithub: z.string(),
  linkWebsite: z.string(),
  logo: z.any().nullable(),
});

export type FormProjectSchemaDTO = z.infer<typeof formProjectSchema>;
