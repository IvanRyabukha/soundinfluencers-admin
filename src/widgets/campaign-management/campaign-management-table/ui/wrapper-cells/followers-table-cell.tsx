
import type { CampaignManagementRow } from "../../model/campaign-management-table.types";

type Props = {
    row: CampaignManagementRow;
};

export const FollowersTableCell = ({ row }: Props) => {
    return <p>{row.account.followers}</p>;
};