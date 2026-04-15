//@ts-nocheck
import styles from "./add-accounts-toolbar.module.scss";
import filterIcon from  '../assets/filter (1).svg'
import { SearchInput } from "@/features/campaign-management-add-accounts/search-input/ui/search-input";
import { AccountsSortSelect } from "@/features/campaign-management-add-accounts/sort-select/ui/sort-select";
import { SwitchView } from "@/features/campaign-management-add-accounts/accounts-view-switch/ui/accounts-view-switch";
import type {
    AddAccountsCurrency,
    AddAccountsSortBy,
    AddAccountsViewMode,
    FilterItem,
} from "@/entities/campaign-managment-add-accounts/model/add-accounts.types";
import x from '../assets/x.svg'
type Props = {
    search: string;
    setSearch: (value: string) => void;
    budget: number;
    setBudget: (value: number) => void;
    currency: AddAccountsCurrency;
    setCurrency: (value: AddAccountsCurrency) => void;
    sortBy: AddAccountsSortBy;
    setSortBy: (value: AddAccountsSortBy) => void;
    view: AddAccountsViewMode;
    setView: (value: AddAccountsViewMode) => void;
    filtersOpen: boolean;
    toggleFilters: () => void;
    selected: FilterItem[];
    removeItem: (id: string) => void;
};

export const AddAccountsToolbar = ({
                                       search,
                                       setSearch,
                                       budget,
                                       setBudget,
                                       currency,
                                       setCurrency,
                                       sortBy,
                                       setSortBy,
                                       view,
                                       setView,
                                       filtersOpen,
                                       toggleFilters,
                                       selected,
                                       removeItem,
                                   }: Props) => {
    const selectedSocialCount = selected.filter(
        (item) => item.group === "socialMedia",
    ).length;
    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <div className={styles.flex}>
                    <div
                        onClick={toggleFilters}
                        className={`${styles.filterFlag} ${filtersOpen ? styles.active : ""}`}>
                        <img src={filterIcon} alt="" />
                        <p>Filters</p>
                    </div>

                    <SearchInput value={search} onChange={setSearch} />
                </div>
                <div className={styles.flexTwo}>
                    <AccountsSortSelect value={sortBy} onChange={setSortBy} />
                    <SwitchView
                        className={styles.viewAfiltersAdd}
                        view={view}
                        setView={setView}
                    />
                </div>

            </div>

            <div className={styles.viewAfilters}>
                <ul className={styles.tagsList}>
                    {selected.map((item) => {
                        const isLastSocial =
                            item.group === "socialMedia" && selectedSocialCount <= 1;

                        return (
                            <li key={item.id} className={styles.tagItem}>
                                <span className={styles.tagText}>
                                  {item.filterName}{" "}
                                    {item.children?.map((child, idx) => (
                                        <span key={child.id ?? idx}>
                                      {child.filterName}
                                            {idx < (item.children?.length ?? 0) - 1 ? ", " : ""}
                                    </span>
                                    ))}
                                </span>

                                {!isLastSocial && (
                                    <button
                                        type="button"
                                        className={styles.tagRemove}
                                        onClick={() => removeItem(item.id)}
                                        aria-label={`Remove ${item.filterName}`}
                                    >
                                        <img src={x} alt="" />
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>


            </div>
        </div>
    );
};