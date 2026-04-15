import { useState } from "react";
import chevronDown from "../assets/chevron-down.svg";
import type {
    FilterBlock,
    FilterItem,
} from "@/entities/campaign-managment-add-accounts/model/add-accounts.types";
import { FilterNode } from "../../filter-node/ui/filter-node";
import styles from "./filter-group.module.scss";

type Props = {
    block: FilterBlock;
    selected: FilterItem[];
    filterMethod: "and" | "or";
    onChangeMethod: (value: "and" | "or") => void;
    onToggleItem: (item: FilterItem, checked: boolean, filters: FilterItem[]) => void;
};

const DEFAULT_OPEN_IDS = ["social-platforms-1", "profile-type", "music-genre"];

export const FilterGroup = ({
                                block,
                                selected,
                                filterMethod,
                                onChangeMethod,
                                onToggleItem,
                            }: Props) => {
    const [open, setOpen] = useState(DEFAULT_OPEN_IDS.includes(block.id));

    return (
        <div className={styles.group}>
            <button type="button" className={styles.head} onClick={() => setOpen((p) => !p)}>
                <p>{block.title}</p>
                <img className={open ? styles.iconOpen : ""} src={chevronDown} alt="" />
            </button>

            {open && !!block.AndOrFlag?.length && (
                <ul className={styles.methods}>
                    {block.AndOrFlag.map((item) => {
                        const value = item.method.toLowerCase() as "and" | "or";

                        return (
                            <li
                                key={item.method}
                                className={filterMethod === value ? styles.activeMethod : ""}
                                onClick={() => onChangeMethod(value)}
                            >
                                {item.method}
                            </li>
                        );
                    })}
                </ul>
            )}

            {open && (
                <div className={styles.body}>
                    {block.filters.map((item) => (
                        <div key={item.id} className={styles.chooseContainer}>
                            <FilterNode
                                item={item}
                                selected={selected}
                                onToggle={(node, checked) => onToggleItem(node, checked, block.filters)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};