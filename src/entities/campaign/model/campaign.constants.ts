import type { TCampaignStatus } from "@/entities/campaign";

export const CAMPAIGN_STATUSES = [
  {
    label: 'Proposals',
    value: 'proposal',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Distributing',
    value: 'distributing',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
] as const satisfies ReadonlyArray<{
  label: string;
  value: TCampaignStatus;
}>;
