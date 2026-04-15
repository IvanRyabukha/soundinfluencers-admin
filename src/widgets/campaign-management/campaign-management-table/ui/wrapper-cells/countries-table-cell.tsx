
import type { CampaignManagementRow } from "../../model/campaign-management-table.types";

type Props = {
    row: CampaignManagementRow;
};

export const CountriesTableCell = ({ row }: Props) => {
    return <div className="tableBase__td td-chips">
        <ul className="chips">
            {(row.account.countries ?? []).map((c: any) => (
                <li key={c.country}>
                    {c.country} {c.percentage}%
                </li>
            ))}
        </ul>
    </div>;
};