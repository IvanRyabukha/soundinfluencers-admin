import styles from "./filters-panel.module.scss";
import cross from "@/assets/icons/x.svg";
import type {
    FilterBlock,
    FilterItem,
} from "@/entities/campaign-managment-add-accounts/model/add-accounts.types";
import {FilterSkeleton} from "@/shared/ui/skeletons/filtre-skeleton.tsx";
import {FilterGroup} from "@/features/campaign-management-add-accounts/filter-group/ui/filters-group.tsx";

type Props = {
    filters: FilterBlock[];
    selected: FilterItem[];
    filterMethod: "and" | "or";
    onChangeMethod: (value: "and" | "or") => void;
    onToggleItem: (item: FilterItem, checked: boolean, filters: FilterItem[]) => void;
    onClose: () => void;
    isSmall?: boolean;
    loading?: boolean;
};

export const FiltersPanel = ({
                                 filters,
                                 selected,
                                 filterMethod,
                                 onChangeMethod,
                                 onToggleItem,
                                 onClose,
                                 isSmall = false,
                                 loading = false,
                             }: Props) => {
    return (
        <div className={`${styles.stickyFilter} ${isSmall ? styles.filterForTable : ""}`}>
            <aside className={styles.root}>
                <div className={styles.sticky}>
                    <div className={styles.head}>
                        <h3>Filters</h3>

                        <button type="button" className={styles.closeButton} onClick={onClose}>
                            <img src={cross} alt="" />
                        </button>
                    </div>

                    <div className={styles.body}>
                        {loading
                            ? Array.from({ length: 12 }).map((_, index) => (
                                <FilterSkeleton key={index} />
                            ))
                            : filters.map((block) => (
                                <FilterGroup
                                    key={block.id}
                                    block={block}
                                    selected={selected}
                                    filterMethod={filterMethod}
                                    onChangeMethod={onChangeMethod}
                                    onToggleItem={onToggleItem}
                                />
                            ))}
                    </div>
                </div>
            </aside>
        </div>
    );
};