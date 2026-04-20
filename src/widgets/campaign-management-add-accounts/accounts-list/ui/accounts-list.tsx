import styles from "./accounts-list.module.scss";
import type {
    AddAccountsCurrency,
    AddAccountsViewMode,
    SocialAccountCard,
} from "@/entities/campaign-managment-add-accounts/model/add-accounts.types";
import { AccountCard } from "../../account-card/ui/account-card";
import { AccountRow } from "../../account-row/ui/account-row";
import { TableCardSkeleton } from "@/shared/ui/skeletons/table-card-skeleton";
import { CardSkeleton } from "@/shared/ui/skeletons/card-skeleton";

type Props = {
    accounts: SocialAccountCard[];
    selectedCards: SocialAccountCard[];
    currency: AddAccountsCurrency;
    view: AddAccountsViewMode;
    onToggleCard: (card: SocialAccountCard) => void;
    isLoading: boolean;
    isFetchingMore?: boolean;
    isRefetching?: boolean;
};

export const AccountsList = ({
                                 accounts,
                                 selectedCards,
                                 currency,
                                 view,
                                 onToggleCard,
                                 isLoading,
                                 isFetchingMore = false,
                                 isRefetching = false,
                             }: Props) => {
    const dimStyle = isRefetching ? { opacity: 0.6 } : undefined;

    if (view === "table") {
        return (
            <div className={styles.cardContainerBlock}>
                <div className={styles.cardsMain} style={dimStyle}>
                    <div className={`${styles.cardsContainer} ${styles.viewed}`}>
                        <div className={styles.promosGrid}>
                            <div className={styles.promosGridHeader}>
                                <div>Name</div>
                                <div>Price</div>
                                <div>Followers</div>
                                <div className={styles.center}>Genres</div>
                                <div className={styles.center}>Countries</div>
                            </div>

                            {isLoading && accounts.length === 0 ? (
                                Array.from({ length: 20 }).map((_, i) => (
                                    <TableCardSkeleton key={`initial-${i}`} />
                                ))
                            ) :  <>
                                {accounts.map((account) => {
                                    const active = selectedCards.some(
                                        (item) => item.accountId === account.accountId,
                                    );

                                    return (
                                        <AccountRow
                                            key={account.accountId}
                                            data={account}
                                            active={active}
                                            currency={currency}
                                            onClick={() => onToggleCard(account)}
                                        />
                                    );
                                })}

                                {isFetchingMore &&
                                    Array.from({ length: 20 }).map((_, i) => (
                                        <TableCardSkeleton key={`append-${i}`} />
                                    ))}
                            </>}
                        </div>
                    </div>

                    {isRefetching && (
                        <div className={styles.updating}>Updating…</div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cardContainerBlock}>
            <div className={styles.cardsMain} style={dimStyle}>
                <div className={styles.cardsContainer}>
                    {isLoading && accounts.length === 0 ? (
                        Array.from({ length: 20 }).map((_, i) => (
                            <CardSkeleton key={`initial-${i}`} />
                        ))
                    ) : <>
                        {accounts.map((account) => {
                            const active = selectedCards.some(
                                (item) => item.accountId === account.accountId,
                            );

                            return (
                                <AccountCard
                                    key={account.accountId}
                                    data={account}
                                    active={active}
                                    currency={currency}
                                    onClick={() => onToggleCard(account)}
                                />
                            );
                        })}

                        {isFetchingMore &&
                            Array.from({ length: 20 }).map((_, i) => (
                                <CardSkeleton key={`append-${i}`} />
                            ))}
                    </>}
                </div>

                {isRefetching && (
                    <div className={styles.updating}>Updating…</div>
                )}
            </div>
        </div>
    );
};