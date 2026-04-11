import { z } from "zod";

const audienceInsightItemSchema = z.array(z.object({
  country: z.string(),
  percentage: z.string(),
}));

export const influencerAccountFormSchema = z.object({
  username: z.string(),
  profileLink: z.string(),
  followers: z.string(),
  logoUrl: z.string(),

  profileCategory: z.enum(["community", "creator"]),

  musicGenresCommunity: z.array(z.string()),
  themeTopics:z.array(z.string()),
  musicGenresCreator: z.array(z.string()),
  contentFocus: z.array(z.string()),

  countries: audienceInsightItemSchema,

  averageViews: z.string(),
  engagementRate: z.string(),
  currency: z.enum(["USD", "EUR", "GBP"]),
  initialPrice: z.string(),
});

export type TInfluencerAccountFormValues = z.infer<typeof influencerAccountFormSchema>;
