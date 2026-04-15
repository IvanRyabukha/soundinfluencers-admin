import { create } from "zustand";
import {
    DEFAULT_BUDGET,
    DEFAULT_CURRENCY,
    DEFAULT_FILTER_METHOD,
    DEFAULT_SORT_BY,
    DEFAULT_SOCIALS,
} from "../model/add-accounts.constants";
import type {
    AddAccountsCurrency,
    AddAccountsFilterMethod,
    AddAccountsSortBy,
    AddAccountsViewMode,
    FilterItem,
    SocialAccountCard,
} from "../model/add-accounts.types";

type State = {
    selected: FilterItem[];
    selectedCards: SocialAccountCard[];
    sortBy: AddAccountsSortBy;
    currency: AddAccountsCurrency;
    budget: number;
    filterMethod: AddAccountsFilterMethod;
    view: AddAccountsViewMode;
    filtersOpen: boolean;

    setSortBy: (value: AddAccountsSortBy) => void;
    setCurrency: (value: AddAccountsCurrency) => void;
    setBudget: (value: number) => void;
    setFilterMethod: (value: AddAccountsFilterMethod) => void;
    setView: (value: AddAccountsViewMode) => void;
    setFiltersOpen: (value: boolean) => void;

    setSelected: (
        itemsOrUpdater:
            | FilterItem[]
            | ((prev: FilterItem[]) => FilterItem[]),
    ) => void;
    toggleItem: (item: FilterItem, checked: boolean, filters: FilterItem[]) => void;
    removeItem: (id: string) => void;

    toggleCard: (card: SocialAccountCard) => void;
    clearSelectedCards: () => void;
    initDefaultSocials: (items: FilterItem[]) => void;
    reset: () => void;
};

export const useCampaignManagementAddAccountsStore = create<State>((set) => ({
    selected: [],
    selectedCards: [],
    sortBy: DEFAULT_SORT_BY,
    currency: DEFAULT_CURRENCY,
    budget: DEFAULT_BUDGET,
    filterMethod: DEFAULT_FILTER_METHOD,
    view: "grid",
    filtersOpen: true,

    setSortBy: (value) => set({ sortBy: value }),
    setCurrency: (value) => set({ currency: value }),
    setBudget: (value) => set({ budget: value }),
    setFilterMethod: (value) => set({ filterMethod: value }),
    setView: (value) => set({ view: value }),
    setFiltersOpen: (value) => set({ filtersOpen: value }),

    setSelected: (itemsOrUpdater) =>
        set((state) => ({
            selected:
                typeof itemsOrUpdater === "function"
                    ? itemsOrUpdater(state.selected)
                    : itemsOrUpdater,
        })),

    toggleItem: (item, checked, filters) => {
        set((state) => {
            const nextSelected = [...state.selected];

            const parent = filters.find((filter) =>
                filter.children?.some((child) => child.id === item.id),
            );

            const findSelected = (id: string) =>
                nextSelected.find((filter) => filter.id === id);

            const addItem = (filter: FilterItem) => {
                if (!findSelected(filter.id)) nextSelected.push({ ...filter });
            };

            const removeItemById = (id: string) => {
                const index = nextSelected.findIndex((filter) => filter.id === id);
                if (index !== -1) nextSelected.splice(index, 1);
            };

            if (checked) {
                if (item.children?.length) {
                    addItem(item);
                } else if (parent) {
                    let selectedParent = findSelected(parent.id);
                    if (!selectedParent) {
                        selectedParent = { ...parent, children: [] };
                        nextSelected.push(selectedParent);
                    }

                    if (!selectedParent.children?.some((child) => child.id === item.id)) {
                        selectedParent.children = [...(selectedParent.children ?? []), { ...item }];
                    }
                } else {
                    addItem(item);
                }
            } else {
                if (item.children?.length) {
                    removeItemById(item.id);
                } else if (parent) {
                    const selectedParent = findSelected(parent.id);
                    if (selectedParent?.children) {
                        selectedParent.children = selectedParent.children.filter(
                            (child) => child.id !== item.id,
                        );

                        if (!selectedParent.children.length) {
                            removeItemById(parent.id);
                        }
                    }
                } else {
                    removeItemById(item.id);
                }
            }

            return { selected: nextSelected };
        });
    },

    removeItem: (id) =>
        set((state) => ({
            selected: state.selected
                .filter((filter) => filter.id !== id)
                .map((filter) =>
                    filter.children
                        ? {
                            ...filter,
                            children: filter.children.filter((child) => child.id !== id),
                        }
                        : filter,
                ),
        })),

    toggleCard: (card) =>
        set((state) => {
            const exists = state.selectedCards.some(
                (item) => item.accountId === card.accountId,
            );

            if (exists) {
                return {
                    selectedCards: state.selectedCards.filter(
                        (item) => item.accountId !== card.accountId,
                    ),
                };
            }

            return {
                selectedCards: [...state.selectedCards, card],
            };
        }),

    clearSelectedCards: () => set({ selectedCards: [] }),

    initDefaultSocials: (items) =>
        set((state) => {
            const withoutSocial = state.selected.filter(
                (item) => item.group !== "socialMedia",
            );
            const defaults = items.filter((item) => DEFAULT_SOCIALS.has(item.id));
            return {
                selected: [...withoutSocial, ...defaults],
            };
        }),

    reset: () =>
        set({
            selected: [],
            selectedCards: [],
            sortBy: DEFAULT_SORT_BY,
            currency: DEFAULT_CURRENCY,
            budget: DEFAULT_BUDGET,
            filterMethod: DEFAULT_FILTER_METHOD,
            view: "grid",
            filtersOpen: true,
        }),
}));