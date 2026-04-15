//@ts-nocheck
import React from "react";
import linkIcon from "../../../assets/link (1).svg";
import editIcon from "../../../assets/edit.svg";

type Props = {
    leftIcon?: string;
    url?: string | null;
    leftAlt?: string;
    canEdit?: boolean;
    onEdit?: () => void;
};

export const LinkCell = ({
                             leftIcon,
                             url,
                             leftAlt = "",
                             canEdit = false,
                             onEdit,
                         }: Props) => {
    const canOpen = Boolean(url);

    const onOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!canOpen) return;
        window.open(url as string, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="link-block">

            {canEdit && (
                <div
                    className="link-block-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.();
                    }}
                >
                    <img src={editIcon} alt="" />
                </div>
            )}
            <div className="link-block-icon" onClick={onOpen}>
                <img
                    src={linkIcon}
                    alt=""
                    style={!canOpen ? { opacity: 0.4, cursor: "not-allowed" } : undefined}
                />
            </div>


        </div>
    );
};