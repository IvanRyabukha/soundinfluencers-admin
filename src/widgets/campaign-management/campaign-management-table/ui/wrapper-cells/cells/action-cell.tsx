import React from "react";

import trash from "./assets/trash-2.svg";
import check from "./assets/check-circle (2).svg";
import checkConfirm from "./assets/check (1).svg";
import x from "./assets/x.svg";

import {
    getAccountKey,
    useCampaignManagementStore,
} from "@/entities/campaign-managment/store/campaign-management.store.ts";

type Props = {
    data: {
        addedAccountsId?: string;
        socialAccountId: string;
    };
};

export const ActionCell: React.FC<Props> = ({ data }) => {
    const [isConfirming, setIsConfirming] = React.useState(false);

    const accountKey = getAccountKey(data as any);

    const removeAccount = useCampaignManagementStore((s) => s.removeAccount);
    const clearRecentlyAdded = useCampaignManagementStore(
        (s) => s.clearRecentlyAdded,
    );
    const canManageAccounts = useCampaignManagementStore((s) =>
        s.canManageAccounts(),
    );
    const recentlyAdded = useCampaignManagementStore(
        (s) => s.recentlyAddedAccountKeys,
    );

    const isRecentlyAdded = recentlyAdded.includes(String(accountKey));

    const onDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        removeAccount(accountKey);
        setIsConfirming(false);
    };

    const setDeletingAccountKey = useCampaignManagementStore(
        (state) => state.setDeletingAccountKey,
    );

    const onDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!canManageAccounts) return;

        if (isRecentlyAdded) {
            setDeletingAccountKey(accountKey);
            removeAccount(accountKey);
            return;
        }

        setDeletingAccountKey(accountKey);
        setIsConfirming(true);
    };

    const onCancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsConfirming(false);
        setDeletingAccountKey(null);
    };

    const onConfirmAdded = (e: React.MouseEvent) => {
        e.stopPropagation();
        clearRecentlyAdded(accountKey);
        setDeletingAccountKey(null);
    };

    if (!canManageAccounts) {
        return <td className="tableBase__td">—</td>;
    }

    return (
        <div
            className={`tableBase__td trash-action ${
                isRecentlyAdded ? "td-wide" : ""
            } ${isConfirming ? "td-wide" : ""}`}
        >
            {isRecentlyAdded && (
                <div className="isRecentlyAdded">
                    <div className="trash-action__content">
                        <button
                            type="button"
                            onClick={onConfirmAdded}
                            className="trash-action__confirm"
                            aria-label="Confirm added"
                            title="Confirm added"
                        >
                            <img src={check} alt="" />
                        </button>
                    </div>

                    <div className="trash-action__content">
                        <button
                            type="button"
                            onClick={onDeleteClick}
                            className="trash-action__delete"
                        >
                            <img src={trash} alt="" />
                        </button>
                    </div>
                </div>
            )}

            {!isRecentlyAdded && isConfirming && (
                <div className="trash-action__confirm-block">
                    <span className="trash-action__label">Delete?</span>

                    <div className="trash-action__confirm-block-row">
                        <button
                            type="button"
                            onClick={onDelete}
                            className="trash-action__same"
                        >
                            <img src={checkConfirm} alt="" />
                        </button>

                        <button
                            type="button"
                            onClick={onCancelDelete}
                            className="trash-action__same"
                        >
                            <img src={x} alt="" />
                        </button>
                    </div>
                </div>
            )}

            {!isRecentlyAdded && !isConfirming && (
                <div className="trash-action__content">
                    <button
                        type="button"
                        onClick={onDeleteClick}
                        className="trash-action__delete"
                    >
                        <img src={trash} alt="" />
                    </button>
                </div>
            )}
        </div>
    );
};