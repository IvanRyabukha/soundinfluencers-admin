import styles from "./bar.module.scss";
import type { EditableCampaign } from "@/entities/campaign-managment/store/campaign-management.store.ts";
import { formatCampaignDate, formatFollowers } from "@/entities/campaign-managment/model/campaign-management.helpers.ts";

type Props = {
    campaign: EditableCampaign | null;
    isLockedStatus: boolean;
    status: string;
};

export const StrategyBar = ({ campaign, isLockedStatus,status }: Props) => {
    const budget =
        campaign?.addedAccounts?.reduce((sum, item) => {
            return sum + Number(item.publicPrice ?? 0);
        }, 0) ?? 0;

    const reach = campaign?.totalFollowers ?? 0;
    const posts = campaign?.addedAccounts?.length ?? 0;
    const videos = campaign?.campaignContent?.length ?? 0;


    const barUIs = [
        ...(!isLockedStatus
            ? [{ name: `Status: ${status}`, row: true }]
            : []),
        { name: `Submitted: ${formatCampaignDate(campaign?.creationDate)}`, row: true },
        { name: `Budget: ${budget}€`, row: true },

        { name: `Reach: ${formatFollowers(reach)} followers`, row: true },
        { name: `Posts: ${posts}`, row: true },
        { name: `Video: ${videos}`, row: false },
    ];

    return (
        <div className={styles.barStrategy}>
            {barUIs.map((item, i) => (
                <div key={i} className={styles.barStrategy__button}>
                    <p>{item.name}</p>
                    {item.row && <div className={styles.row} />}
                </div>
            ))}
        </div>
    );
};