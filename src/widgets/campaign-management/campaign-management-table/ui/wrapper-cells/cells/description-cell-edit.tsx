//@ts-nocheck

import React from "react";
import check from "./assets/check.svg";
import x from "./assets/x (2).svg";
import plus from "./assets/plus.svg";
import trash from "./assets/trash-2.svg";
import { useCampaignManagementStore } from "@/entities/campaign-managment/store/campaign-management.store.ts";
import {Dropdown} from "@/shared/ui/dropdown-table/dropdowns-table.tsx";

type Desc = { _id?: string; description: string };

type Props = {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    onOpenChange: (open: boolean) => void;
    platformItems: any[];
    selectedContent: number;
    onSelectDescriptionId?: (descriptionId: string) => void;
    selectedPd: number;
    setSelectedPd: (v: number) => void;
    group: string;
};

const objectId = () => {
    const bytes = new Uint8Array(12);

    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
        crypto.getRandomValues(bytes);
    } else {
        for (let i = 0; i < 12; i++) {
            bytes[i] = Math.floor(Math.random() * 256);
        }
    }

    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
};

export const DescriptionCellEdit = React.memo(function DescriptionCellEdit({
                                                                               isOpen,
                                                                               onToggle,
                                                                               onClose,
                                                                               platformItems,
                                                                               selectedContent,
                                                                               selectedPd,
                                                                               setSelectedPd,
                                                                               group,
                                                                               onSelectDescriptionId,onOpenChange
                                                                           }: Props) {
    const baseItem = platformItems?.[selectedContent];
    const contentId: string | undefined = baseItem?._id;

    const setContentDescriptions = useCampaignManagementStore(
        (s) => s.setContentDescriptions,
    );

    const editingDescs: Desc[] = (baseItem?.descriptions ?? []) as Desc[];
    const visibleDescs = React.useMemo(
        () =>
            editingDescs
                .map((desc, idx) => ({ desc, idx }))
                .filter(({ desc }) => String(desc?.description ?? "").trim().length > 0),
        [editingDescs],
    );

    const safeSelectedText =
        String(editingDescs?.[selectedPd]?.description ?? "").trim() || "—";
    const [editIdx, setEditIdx] = React.useState<number | null>(null);
    const [editText, setEditText] = React.useState("");
    const [deleteIdx, setDeleteIdx] = React.useState<number | null>(null);

    const [isAdding, setIsAdding] = React.useState(false);
    const [newText, setNewText] = React.useState("");

    React.useEffect(() => {
        setIsAdding(false);
        setNewText("");
        setDeleteIdx(null);
        setEditIdx(null);
        setEditText("");
    }, [contentId]);

    const selectPd = React.useCallback(
        (idx: number) => {
            const nextId = String(editingDescs?.[idx]?._id ?? "");
            setSelectedPd(idx);
            onSelectDescriptionId?.(nextId);
            onOpenChange(false);
        },
        [editingDescs, setSelectedPd, onSelectDescriptionId, onOpenChange],
    );

    const startAdd = React.useCallback(() => {
        setIsAdding(true);
        setNewText("");
    }, []);

    const cancelAdd = React.useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsAdding(false);
        setNewText("");
    }, []);

    const commitAdd = React.useCallback(
        (e?: React.MouseEvent) => {
            e?.stopPropagation();

            const trimmed = newText.trim();
            if (!contentId) return;

            if (!trimmed) {
                setIsAdding(false);
                setNewText("");
                return;
            }

            const created = {
                _id: objectId(),
                description: trimmed,
            };

            const nextDescs = [...editingDescs, created];
            setContentDescriptions(contentId, nextDescs);

            setSelectedPd(nextDescs.length - 1);
            onSelectDescriptionId?.(created._id ?? "");

            setIsAdding(false);
            setNewText("");
        },
        [
            contentId,
            newText,
            editingDescs,
            setContentDescriptions,
            setSelectedPd,
            onSelectDescriptionId,
        ],
    );

    const confirmDelete = React.useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (deleteIdx === null || !contentId) return;

            const nextDescs = editingDescs.filter((_, idx) => idx !== deleteIdx);
            setContentDescriptions(contentId, nextDescs);

            let nextSelectedIdx = selectedPd;

            if (selectedPd === deleteIdx) {
                nextSelectedIdx = Math.max(0, deleteIdx - 1);
            } else if (selectedPd > deleteIdx) {
                nextSelectedIdx = selectedPd - 1;
            }

            setSelectedPd(nextSelectedIdx);
            onSelectDescriptionId?.(
                String(nextDescs?.[nextSelectedIdx]?._id ?? ""),
            );

            if (editIdx === deleteIdx) {
                setEditIdx(null);
                setEditText("");
            }

            setDeleteIdx(null);
        },
        [
            deleteIdx,
            contentId,
            editingDescs,
            setContentDescriptions,
            selectedPd,
            setSelectedPd,
            onSelectDescriptionId,
            editIdx,
        ],
    );

    const cancelDelete = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteIdx(null);
    }, []);

    if (!contentId) {
        return (
            <td className="tableBase__td">
                <p className="hidden-text desc">—</p>
            </td>
        );
    }

    const updateDescriptionByIndex = (idx: number, value: string) => {
        if (!contentId) return;

        const next = editingDescs.map((item, index) =>
            index === idx ? { ...item, description: value } : item,
        );

        setContentDescriptions(contentId, next);
    };

    const groupTitle = (value: string) => {
        switch (value) {
            case "main":
                return "post description";
            case "music":
                return "track title";
            case "press":
                return "artwork link";
            default:
                return "";
        }
    };

    return (
        <>
            {group !== "press" ? (
                <Dropdown
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    selected={<p className="hidden-text desc">{safeSelectedText}</p>}
                >
                    <div className="post-description-block">
                        <ul className="dropdown-list">
                            {editingDescs.map((desc, idx) => (
                                <li
                                    className="desc-li"
                                    key={desc?._id ?? idx}
                                    onClick={() => selectPd(idx)}
                                >
                  <span className={selectedPd === idx ? "active" : ""}>
                    {idx + 1}
                  </span>

                                    {editIdx === idx ? (
                                        <input
                                            className="hidden-text desc-li"
                                            autoFocus
                                            value={editText}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onBlur={() => {
                                                updateDescriptionByIndex(idx, editText);
                                                setEditIdx(null);
                                                setEditText("");
                                            }}
                                        />
                                    ) : (
                                        <p
                                            className="hidden-text desc-li"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditIdx(idx);
                                                setEditText(desc.description ?? "");
                                            }}
                                            title={desc?.description}
                                        >
                                            {desc?.description}
                                        </p>
                                    )}

                                    {deleteIdx === idx ? (
                                        <div className="confirm-delete">
                                            <img
                                                src={check}
                                                alt=""
                                                onClick={confirmDelete}
                                                style={{ cursor: "pointer" }}
                                            />
                                            <img
                                                src={x}
                                                alt=""
                                                onClick={cancelDelete}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            className="trash"
                                            src={trash}
                                            alt=""
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteIdx(idx);
                                            }}
                                        />
                                    )}
                                </li>
                            ))}

                            {isAdding && (
                                <li
                                    key="__new__"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{ cursor: "default" }}
                                >
                                    <span>{editingDescs.length + 1}</span>

                                    <input
                                        autoFocus
                                        value={newText}
                                        placeholder={`New ${groupTitle(group)}...`}
                                        onChange={(e) => setNewText(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    />

                                    <div className="confirm-delete">
                                        <img
                                            src={check}
                                            alt=""
                                            onClick={commitAdd}
                                            style={{ cursor: "pointer" }}
                                        />
                                        <img
                                            src={x}
                                            alt=""
                                            onClick={cancelAdd}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                </li>
                            )}
                        </ul>

                        {!isAdding && (
                            <div onClick={startAdd} className="add-desc">
                                <div className="add-desc__icon">
                                    <img src={plus} alt="" />
                                </div>
                                <p>Add new {groupTitle(group)}</p>
                            </div>
                        )}
                    </div>
                </Dropdown>
            ) : (
                <input
                    className="hidden-text desc"
                    value={editingDescs?.[0]?.description ?? ""}
                    onChange={(e) => {
                        if (!contentId) return;

                        const value = e.target.value;
                        const next = editingDescs.length
                            ? editingDescs.map((item, idx) =>
                                idx === 0 ? { ...item, description: value } : item,
                            )
                            : [{ _id: objectId(), description: value }];

                        setContentDescriptions(contentId, next);
                    }}
                    placeholder="Artwork link"
                />
            )}
        </>
    );
});