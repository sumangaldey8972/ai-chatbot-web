import type { ModelId } from "@/features/chat/types/chat";

export type ModelOption = {
  id: ModelId;
  label: string;
  helper: string;
};

export const MODEL_OPTIONS: ModelOption[] = [
  { id: "auto", label: "Auto", helper: "Best model for your request" },
  {
    id: "general",
    label: "General AI (Claude Haiku)",
    helper: "Fast, reliable, everyday tasks",
  },
  {
    id: "flexible",
    label: "Flexible Mode (Qwen)",
    helper: "Versatile and adaptable",
  },
];
