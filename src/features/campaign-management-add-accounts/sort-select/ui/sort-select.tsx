import React from "react";
import styles from "./sort-select.module.scss";
import chevronDown from "../assets/chevron-down.svg";
import check from "@/assets/icons/check.svg";
import type { AddAccountsSortBy } from "@/entities/campaign-managment-add-accounts/model/add-accounts.types";

type Props = {
    value: AddAccountsSortBy;
    onChange: (value: AddAccountsSortBy) => void;
};

const SORT_OPTIONS: Array<{ value: AddAccountsSortBy; label: string }> = [
    { value: "bestMatch", label: "Best match" },
    { value: "lowestPrice", label: "Lowest price" },
    { value: "highestPrice", label: "Highest price" },
    { value: "lowestFollowers", label: "Lowest followers" },
    { value: "highestFollowers", label: "Highest followers" },
];

export const AccountsSortSelect = ({ value, onChange }: Props) => {
    const [open, setOpen] = React.useState(false);
    const rootRef = React.useRef<HTMLDivElement | null>(null);

    const selectedLabel =
        SORT_OPTIONS.find((item) => item.value === value)?.label ?? "Best match";

    React.useEffect(() => {
        const handleOutside = (e: MouseEvent | TouchEvent) => {
            const el = rootRef.current;
            if (!el) return;
            if (e.target instanceof Node && !el.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside);

        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("touchstart", handleOutside);
        };
    }, []);

    return (
        <div ref={rootRef} className={`${styles.BudgetPopUp} ${styles.less}`}>
            <button
                type="button"
                className={`${styles.BudgetPopUp__title} ${open ? styles.active : ""}`}
                onClick={() => setOpen((prev) => !prev)}
            >
                <p>{selectedLabel}</p>
                <img
                    className={open ? styles.activeIcon : ""}
                    src={chevronDown}
                    alt=""
                />
            </button>

            {open && (
                <div
                    className={`${styles.BudgetPopUp__select} ${open ? styles.active : ""}`}
                >
                    <ul className={styles.mySortList}>
                        {SORT_OPTIONS.map((item) => (
                            <li
                                key={item.value}
                                onClick={() => {
                                    onChange(item.value);
                                    setOpen(false);
                                }}
                            >
                                {item.label}
                                {item.value === value && <img src={check} alt="" />}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};