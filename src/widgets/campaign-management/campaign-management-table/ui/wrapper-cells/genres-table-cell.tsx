
import type { CampaignManagementRow } from "../../model/campaign-management-table.types";

type Props = {
    row: CampaignManagementRow;
};

export const GenresTableCell = ({ row }: Props) => {
    return <td className="tableBase__td td-chips">
        <ul className="chips">
            {row?.account?.genres?.map((item: string) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </td>;
};