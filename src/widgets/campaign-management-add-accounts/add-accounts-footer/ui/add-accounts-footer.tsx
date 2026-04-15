//@ts-nocheck

import styles from "./add-accounts-footer.module.scss";
import { getCurrencySymbol } from "@/entities/campaign-managment-add-accounts/model/add-accounts.types";

type Props = {
    selectedCount: number;
    totalPrice: number;
    currency: string;
    onCancel: () => void;
    onAdd: () => void;
};

export const AddAccountsFooter = ({
                                      selectedCount,
                                      totalPrice,
                                      currency,
                                      onAdd,
                                  }: Props) => {
    const isActive = totalPrice > 0 && selectedCount > 0;
    console.log(totalPrice)
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <p>
                    Networks:
                    <span className={styles.count}>{selectedCount}</span>
                </p>

                <p>
                    Total:
                    <span className={styles.count}>
            {totalPrice}
                        {getCurrencySymbol(currency as any)}
          </span>
                </p>
            </div>

            <div className={styles.actions}>

                <button
                    type="button"
                    className={isActive ? styles.active : styles.nonActive}
                    onClick={onAdd}
                    disabled={!isActive}
                >
                    Add
                </button>
            </div>
        </div>
    );
};