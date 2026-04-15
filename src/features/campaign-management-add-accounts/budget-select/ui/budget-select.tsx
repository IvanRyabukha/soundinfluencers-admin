import React from "react";
import styles from "./budget-select.module.scss";
// import chevronDown from "@/assets/icons/chevron-down.svg";
import type { AddAccountsCurrency } from "@/entities/campaign-managment-add-accounts/model/add-accounts.types";

type Props = {
    budget: number;
    currency: AddAccountsCurrency;
    onChangeBudget: (value: number) => void;
    onChangeCurrency: (value: AddAccountsCurrency) => void;
};

const CURRENCIES: AddAccountsCurrency[] = ["EUR", "USD", "GBP"];

export const BudgetSelect = ({
                                 budget,
                                 currency,
                                 onChangeBudget,
                                 onChangeCurrency,
                             }: Props) => {
    const [open, setOpen] = React.useState(false);
    const rootRef = React.useRef<HTMLDivElement | null>(null);

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
        <div ref={rootRef} className={styles.BudgetPopUp}>
            <button
                type="button"
                className={`${styles.BudgetPopUp__title} ${open ? styles.active : ""}`}
                onClick={() => setOpen((prev) => !prev)}
            >
                <p>{`Budget: ${budget} ${currency}`}</p>
                {/*<img*/}
                {/*    className={open ? styles.activeIcon : ""}*/}
                {/*    src={chevronDown}*/}
                {/*    alt=""*/}
                {/*/>*/}
            </button>

            {open && (
                <div
                    className={`${styles.BudgetPopUp__select} ${open ? styles.active : ""}`}
                >
                    <div className={styles.currency}>
                        <ul>
                            {CURRENCIES.map((item) => (
                                <li
                                    key={item}
                                    className={item === currency ? styles.active : ""}
                                    onClick={() => onChangeCurrency(item)}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.BudgetPopUp__select_price}>
                        <label htmlFor="budget-input">Price</label>

                        <input
                            id="budget-input"
                            type="number"
                            value={budget}
                            onChange={(e) => onChangeBudget(Number(e.target.value) || 0)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};