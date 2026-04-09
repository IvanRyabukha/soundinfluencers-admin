import { z } from "zod";

const domainRegex = /^(localhost|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/;

const normalizeUrl = (value: string) => {
  const trimmed = value.trim();

  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
};

export const influencerAccountLinkSchema = z.object({
  newLink: z
  .string()
  .trim()
  .min(1, "Link is required")
  .transform(normalizeUrl)
  .refine((value) => {
    try {
      const url = new URL(value);

      return (
        (url.protocol === "http:" || url.protocol === "https:") &&
        domainRegex.test(url.hostname)
      );
    } catch {
      return false;
    }
  }, "Enter a valid URL"),
});

export type InfluencerAccountLinkFormValues = z.infer<typeof influencerAccountLinkSchema>;
