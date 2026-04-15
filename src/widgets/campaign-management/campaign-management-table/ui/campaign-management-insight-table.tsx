//@ts-nocheck

import React from "react";
import {
    buildCampaignManagementInsightRows,
} from "@/widgets/campaign-management/campaign-management-table/model/campaign-management-table.helpers.ts";
import {
    getCampaignManagementInsightColumns,
} from "@/widgets/campaign-management/campaign-management-table/ui/campaign-management-insight-columns.tsx";
import {
    TableCampaignInsight,
} from "@/widgets/campaign-management/campaign-management-table/ui/table-campaign-management/ui/tableInsight.tsx";
import {
    getAccountKey,
    useCampaignManagementStore,
} from "@/entities/campaign-managment/store/campaign-management.store";
import type {
    CampaignManagementInsightRow,
} from "@/widgets/campaign-management/campaign-management-table/model/campaign-management-table.types.ts";
import {Modal} from "@/shared/ui/modal/modal.tsx";
import {payPromoCampaign} from "@/entities/campaign-managment/api/campaign-controls.api.ts";
import {toast} from "react-toastify";


type Props = {
    networks: any[];
    totals: {
        followers: number;
        impressions: number;
        likes: number;
        comments: number;
        saves: number;
        shares: number;
    };
    canEdit: boolean;
    canManageAccounts: boolean;
    campaignId: string;
    statusParam?: string | null;
    optionIndex: number;
    totalPrice?: number;
};

export const CampaignManagementInsightTable = ({
                                                   networks,
                                                   totals,
                                                   canEdit,
                                                   canManageAccounts,
                                                   campaignId,
                                                   statusParam,
                                                   optionIndex,
                                                   totalPrice,
                                               }: Props) => {
    const rows = React.useMemo(
        () => buildCampaignManagementInsightRows(networks),
        [networks],
    );

    const [linkModal, setLinkModal] = React.useState<{
        isOpen: boolean;
        accountKey: string;
        field: "postLink" | "screenshot" | null;
        value: string;
        title: string;
    }>({
        isOpen: false,
        accountKey: "",
        field: null,
        value: "",
        title: "",
    });

    const setAccountInsightField = useCampaignManagementStore(
        (s) => s.setAccountInsightField,
    );
    const [showCpm, setShowCpm] = React.useState(false);
    const handlePayPromo = React.useCallback(
        async (row: CampaignManagementInsightRow) => {
            const promoId = row.account.addedAccountsId;
            if (!campaignId || !promoId) return;

            try {
                await payPromoCampaign({
                    campaignId,
                    promoId,
                });

                setAccountInsightField(getAccountKey(row.account), "closePromo", "close");
                toast.success("Promo marked as paid");
            } catch (error) {
                console.error("Failed to pay promo", error);
                toast.error("Failed to mark promo as paid");
            }
        },
        [campaignId, setAccountInsightField],
    );
    const handleOpenLinkModal = React.useCallback(
        (row: CampaignManagementInsightRow, field: "postLink" | "screenshot") => {
            const accountKey = getAccountKey(row.account);

            setLinkModal({
                isOpen: true,
                accountKey,
                field,
                value:
                    field === "postLink"
                        ? row.account.postLink ?? ""
                        : row.account.screenshot ?? "",
                title: field === "postLink" ? "Edit post link" : "Edit screenshot link",
            });
        },
        [],
    );

    const handleSaveLinkModal = React.useCallback(() => {
        if (!linkModal.field || !linkModal.accountKey) return;

        setAccountInsightField(linkModal.accountKey, linkModal.field, linkModal.value);

        setLinkModal({
            isOpen: false,
            accountKey: "",
            field: null,
            value: "",
            title: "",
        });
    }, [linkModal, setAccountInsightField]);

    const columns = React.useMemo(
        () =>
            getCampaignManagementInsightColumns({
                status: statusParam,
                canEdit,
                showCpm,
                onEditLink: handleOpenLinkModal,
                onMetricChange: (row, field, value) => {
                    setAccountInsightField(getAccountKey(row.account), field, value);
                },
                onPay: handlePayPromo,
                onToggleCpm: () => setShowCpm((prev) => !prev),
            }),
        [
            statusParam,
            canEdit,
            showCpm,
            handleOpenLinkModal,
            setAccountInsightField,
            handlePayPromo,
        ],
    );

    return (
        <div className="tableBase">
            <TableCampaignInsight
                data={rows}
                columns={columns}
                isFetching={false}
                emptyText="No insights found"
                totals={totals}
                canManageAccounts={canManageAccounts}
                campaignId={campaignId}
                statusParam={statusParam}
                optionIndex={optionIndex}
                getRowKey={(row) => row.accountKey}
                totalPrice={totalPrice}
            />

            {linkModal.isOpen && (
                <Modal
                    onClose={() =>
                        setLinkModal((prev) => ({ ...prev, isOpen: false }))
                    }
                >
                    <div className="create-option">
                        <h2>{linkModal.title}</h2>

                        <input
                            className="create-option-input"
                            type="text"
                            value={linkModal.value}
                            onChange={(e) =>
                                setLinkModal((prev) => ({
                                    ...prev,
                                    value: e.target.value,
                                }))
                            }
                            placeholder="Paste link"
                        />

                        <div className="create-option-btn">
                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    setLinkModal((prev) => ({ ...prev, isOpen: false }))
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn"
                                onClick={handleSaveLinkModal}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};