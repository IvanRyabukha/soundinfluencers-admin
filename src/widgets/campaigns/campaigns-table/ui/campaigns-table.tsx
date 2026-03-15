import { Table } from "@/shared/ui";
import type { ICampaign, TViewCampaignMode } from "@/entities/campaign/model/campaign.types.ts";
import { mainCampaignColumns } from "@/widgets/campaigns/campaigns-table/model/main-columns.tsx";
import { paymentsCampaignColumns } from "@/widgets/campaigns/campaigns-table/model/payments-columns.tsx";

interface CampaignsTableProps {
  data: ICampaign[];
  isLoading?: boolean;
  view: TViewCampaignMode;
}

export const CampaignsTable = ({ data, view }: CampaignsTableProps) => {
  const columns = view === 'payments' ? paymentsCampaignColumns : mainCampaignColumns;

  return (
    <Table
      data={data}
      columns={columns}
      isLoading={false}
      emptyText="No campaigns found"
    />
  )
};
