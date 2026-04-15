import styles from "./bar.module.scss";

import edit from "./assets/edit-3.png";
import insight from "./assets/bar-chart-2.svg";
import activity from "./assets/activity.svg";

import type { EditableCampaign } from "@/entities/campaign-managment/store/campaign-management.store.ts";
import {
    formatCampaignDate,
    formatFollowers,
} from "@/entities/campaign-managment/model/campaign-management.helpers.ts";
import { EyeHide } from "@/features/campaign-management-add-accounts/eye-hide/eye-hide.tsx";
import {
    CurrencyDropdown,
    type CurrencyCode,
} from "@/features/campaign-management-add-accounts/currency-dropdown/ui/currency-dropdown.tsx";
import { useCampaignManagementStore } from "@/entities/campaign-managment/store/campaign-management.store.ts";

type Props = {
    campaign: EditableCampaign | null;
};

const getResultCPM = (cpm: number) => {
    if (cpm < 3) return "Excellent";
    if (cpm < 5) return "Highly Above Average";
    if (cpm < 9) return "Above Average";
    if (cpm < 12) return "Average";
    return "Low Average";
};

const getCPM = (cpm: number) => {
    if (cpm < 3) return "0 to 3€";
    if (cpm < 5) return "3€ to 5€";
    if (cpm < 9) return "5€ to 9€";
    if (cpm < 12) return "9€ to 12€";
    if (cpm < 16) return "12€ to 16€";
    if (cpm < 20) return "16€ to 20€";
    if (cpm < 25) return "20€ to 25€";
    if (cpm < 30) return "25€ to 30€";
    if (cpm < 35) return "30€ to 35€";
    if (cpm < 40) return "35€ to 40€";
    return ">40€";
};

const currencySymbolMap: Record<CurrencyCode, string> = {
    EUR: "€",
    USD: "$",
    GBP: "£",
};

export const InsightBar = ({ campaign }: Props) => {
    const setDisplayCurrency = useCampaignManagementStore((s) => s.setDisplayCurrency);
    const setIsPriceHidden = useCampaignManagementStore((s) => s.setIsPriceHidden);
    const setIsCpmAndResultHidden = useCampaignManagementStore((s) => s.setIsCpmAndResultHidden);

    const currency = (campaign?.displayCurrency as CurrencyCode) || "EUR";
    const currencySymbol = currencySymbolMap[currency];

    const cpm = getCPM(Number(campaign?.cpm ?? 0));
    const resultCPM = getResultCPM(Number(campaign?.cpm ?? 0));

    const budget =
        campaign?.addedAccounts?.reduce(
            (sum, item) => sum + Number(item.publicPrice ?? 0),
            0,
        ) ?? 0;

    const posts = campaign?.addedAccounts?.length ?? 0;
    const videos = campaign?.campaignContent?.length ?? 0;
    const reach = campaign?.totalFollowers ?? 0;

    const impressions = campaign?.totalImpressions ?? 0;
    const likes = campaign?.totalLikes ?? 0;
    const comments = campaign?.totalComments ?? 0;
    const saves = campaign?.totalSaves ?? 0;
    const shares = campaign?.totalShares ?? 0;

    const isPriceHidden = Boolean(campaign?.isPriceHidden);
    const isCpmHidden = Boolean(campaign?.isCpmAndResultHidden);

    return (
        <div className={styles.barSection}>
            <div className={`${styles.barSectionInfo} ${styles.block}`}>
                <div className={styles.barSectionInfoTitle}>
                    <img src={edit} alt="" />
                    <h2>Brief</h2>
                </div>

                <div className={styles.barSectionInfoContent}>
                    <div className={styles.barSectionInfoLeftSection}>
                        <p>
                            Submitted: <span>{formatCampaignDate(campaign?.creationDate)}</span>
                        </p>

                        <div className={styles.eye}>
                            <p>
                                Budget:{" "}
                                <span>
                                    {isPriceHidden ? "••••" : `${budget}${currencySymbol}`}
                                </span>
                            </p>

                            <CurrencyDropdown
                                value={currency}
                                onChange={(value) => setDisplayCurrency(value)}
                            />

                            <EyeHide
                                isHidden={isPriceHidden}
                                onToggle={() => setIsPriceHidden(!isPriceHidden)}
                            />
                        </div>

                        <p>
                            Posts: <span>{posts}</span>
                        </p>
                    </div>

                    <div className={styles.barSectionInfoRightSection}>
                        <p>
                            Reach: <span>{formatFollowers(reach)} followers</span>
                        </p>
                        <p>
                            Videos: <span>{videos}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={`${styles.barSectionInfo} ${styles.block}`}>
                <div className={styles.barSectionInfoTitle}>
                    <img src={insight} alt="" />
                    <h2>Insights</h2>
                </div>

                <div className={styles.barSectionInfoContent}>
                    <div className={styles.barSectionInfoLeftSection}>
                        <p>
                            Impressions: <span>{impressions}</span>
                        </p>
                        <p>
                            Likes: <span>{likes}</span>
                        </p>
                        <p>
                            Saves: <span>{saves}</span>
                        </p>
                    </div>

                    <div className={styles.barSectionInfoRightSection}>
                        <p>
                            Comments: <span>{comments}</span>
                        </p>
                        <p>
                            Shares: <span>{shares}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={`${styles.barSectionInfo} ${styles.block}`}>
                <div className={styles.barSectionInfoTitle}>
                    <img src={activity} alt="" />
                    <h2>Performance</h2>
                </div>

                <div className={styles.barSectionInfoContent}>
                    <div className={styles.barSectionInfoLeftSection}>
                        <div className={styles.eye}>
                            <p>
                                CPM: <span>{isCpmHidden ? "••••" : cpm}</span>
                            </p>

                            <EyeHide
                                isHidden={isCpmHidden}
                                onToggle={() =>
                                    setIsCpmAndResultHidden(!isCpmHidden)
                                }
                            />
                        </div>

                        <p>
                            Average Instagram CPM:{" "}
                            <span>5€ to 12€</span>
                        </p>

                        <p>
                            Result: <span>{resultCPM}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};