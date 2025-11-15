import { z } from "zod";

export const AgentRequestSchema = z.object({
  selectedStep: z.record(z.string(), z.string()), // FIXED
  platform: z.enum(["tiktok.com", "x.com", "instagram.com"]),
  instance: z.string().min(1, "Instance is required"),
});

export type AgentRequest = z.infer<typeof AgentRequestSchema>;
