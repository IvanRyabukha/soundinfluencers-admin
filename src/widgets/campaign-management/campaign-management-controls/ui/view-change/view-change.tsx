import React from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./view-change.module.scss";
import edit from "./assets/edit.svg";
import proview from "./assets/Vector (15).svg";
import liveview from "./assets/Vector (16).svg";
import type { ViewMode } from "@/entities/campaign-managment/model/campaign-management-table.types";

interface Props {
    setView: React.Dispatch<React.SetStateAction<ViewMode>> | ((view: ViewMode) => void);
    view: ViewMode | null;
    isProposal?: boolean;
    canEdit?: boolean;
}

export const ViewChange: React.FC<Props> = ({
                                                setView,
                                                view,
                                                isProposal,
                                                canEdit,
                                            }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const proposalTabs = [
        ...(canEdit
            ? [
                {
                    label: "Edit View",
                    icon: edit,
                    value: -1 as ViewMode,
                },
            ]
            : []),
        {
            label: "Pro View",
            icon: proview,
            value: 0 as ViewMode,
        },
        {
            label: "Live View",
            icon: liveview,
            value: 1 as ViewMode,
        },
    ];

    const regularTabs = [
        {
            label: "Edit View",
            icon: edit,
            value: -1 as ViewMode,
        },
        {
            label: "Live View",
            icon: liveview,
            value: 1 as ViewMode,
        },
    ];

    const tabs = isProposal ? proposalTabs : regularTabs;

    React.useEffect(() => {
        const viewParam = searchParams.get("view");

        if (viewParam === null) {
            return;
        }

        const parsed = Number(viewParam) as ViewMode;
        const isValid = tabs.some((tab) => tab.value === parsed);

        if (isValid && parsed !== view) {
            setView(parsed);
        }
    }, [searchParams, setView, tabs, view]);

    const active = typeof view === "number" ? view : 0;

    const handleChangeView = (newView: ViewMode) => {
        setView(newView);

        const nextParams = new URLSearchParams(searchParams);
        nextParams.set("view", String(newView));
        setSearchParams(nextParams);
    };

    return (
        <div className={styles.changeViewTable}>
            <div className={styles.segmented}>
                {tabs.map((tab) => (
                    <div
                        key={tab.label}
                        className={
                            active === tab.value
                                ? `${styles.item} ${styles.active}`
                                : styles.item
                        }
                        onClick={() => handleChangeView(tab.value)}
                        role="button"
                        tabIndex={0}
                    >
                        <img src={tab.icon} alt={tab.label} />
                    </div>
                ))}
            </div>
        </div>
    );
};