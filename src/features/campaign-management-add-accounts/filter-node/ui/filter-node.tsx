import type { FilterItem } from "@/entities/campaign-managment-add-accounts/model/add-accounts.types";
import styles from "./filter-node.module.scss";

type Props = {
    item: FilterItem;
    selected: FilterItem[];
    onToggle: (item: FilterItem, checked: boolean) => void;
};

export const FilterNode = ({ item, selected, onToggle }: Props) => {
    const isChecked = (filter: FilterItem) =>
        selected.some(
            (f) => f.id === filter.id || f.children?.some((c) => c.id === filter.id),
        );

    const selectedSocialCount = selected.filter(
        (f) => f.group === "socialMedia",
    ).length;

    const checked = isChecked(item);
    const isLastSocial =
        item.group === "socialMedia" && checked && selectedSocialCount <= 1;

    return (
        <div className={styles.node}>
            <div className={styles.home}>
                <label className={styles.parentItem}>
                    <input
                        id={item.id}
                        type="checkbox"
                        checked={checked}
                        disabled={isLastSocial}
                        onChange={(e) => onToggle(item, e.target.checked)}
                    />
                    <span className={styles.label}>{item.filterName}</span>
                    {typeof item.count === "number" && (
                        <span className={styles.count}>{item.count}</span>
                    )}
                </label>

                {!!item.children?.length && (
                    <div className={styles.children}>
                        {item.children.map((child) => (
                            <FilterNode
                                key={child.id}
                                item={child}
                                selected={selected}
                                onToggle={onToggle}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};