import styles from "./share-link.module.scss";
import share from "./assets/link.svg";
import { toast } from "react-toastify";
import {buildCampaignManagementShareLink} from "@/entities/campaign-managment/model/campaign-management.helpers.ts";

type Props = {
    campaignId: string;
    kind: string;
    socialMedia?: string;
};

export const ShareLink = ({ campaignId, kind, socialMedia }: Props) => {
    const handleCopy = async () => {
        try {
            const link = buildCampaignManagementShareLink({
                id: campaignId,
                kind,
                socialMedia,
            });

            await navigator.clipboard.writeText(link);
            toast.success("Shared link copied");
        } catch (error) {
            console.error(error);
            toast.error("Failed to copy share link");
        }
    };

    return (
        <button type="button" className={styles.shareLink} onClick={handleCopy}>
            <img src={share} alt="" />
            <p>Share link</p>
        </button>
    );
};