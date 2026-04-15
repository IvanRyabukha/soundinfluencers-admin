import React from "react";
import styles from "./currency-dropdown.module.scss";
import arrow from "../assets/chevron-down.svg";

export type CurrencyCode = "EUR" | "USD" | "GBP";

type CurrencyOption = {
    id: CurrencyCode;
    label: string;
    symbol: string;
};

const CURRENCY_OPTIONS: CurrencyOption[] = [
    { id: "EUR", label: "Euro", symbol: "€" },
    { id: "USD", label: "US Dollar", symbol: "$" },
    { id: "GBP", label: "British Pound", symbol: "£" },
];

type Props = {
    value: CurrencyCode;
    onChange: (value: CurrencyCode) => void;
    disabled?: boolean;
};

export const CurrencyDropdown = ({
                                     value,
                                     onChange,
                                     disabled = false,
                                 }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const rootRef = React.useRef<HTMLDivElement | null>(null);

    const selectedOption =
        CURRENCY_OPTIONS.find((item) => item.id === value) ?? CURRENCY_OPTIONS[0];

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (currency: CurrencyCode) => {
        onChange(currency);
        setIsOpen(false);
    };

    return (
        <div
            ref={rootRef}
            className={`${styles.dropdown} ${disabled ? styles.disabled : ""}`}
        >
            <button
                type="button"
                className={styles.trigger}
                onClick={() => !disabled && setIsOpen((prev) => !prev)}
                disabled={disabled}
            >
                <span className={styles.value}>{selectedOption.symbol}</span>
                <img
                    src={arrow}
                    alt=""
                    className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
                />
            </button>

            {isOpen && (
                <div className={styles.menu}>
                    {CURRENCY_OPTIONS.map((option) => {
                        const isActive = option.id === value;

                        return (
                            <button
                                key={option.id}
                                type="button"
                                className={`${styles.option} ${
                                    isActive ? styles.optionActive : ""
                                }`}
                                onClick={() => handleSelect(option.id)}
                            >
                                <span className={styles.optionSymbol}>{option.symbol}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};