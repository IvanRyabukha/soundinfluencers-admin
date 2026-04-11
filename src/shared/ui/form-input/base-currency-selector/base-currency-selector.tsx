import { type FieldValues, type Path, useController, useFormContext } from "react-hook-form";
import type { TCurrency } from "@/shared/types/types.ts";
import clsx from "clsx";

import s from './base-currency-selector.module.scss';

const CURRENCIES: { value: TCurrency; label: string }[] = [
  { value: "GBP", label: "£" },
  { value: "USD", label: "$" },
  { value: "EUR", label: "€" },
];

interface BaseCurrencySelectorProps<T extends FieldValues> {
  name: Path<T>;
  disabled?: boolean;
  className?: string;
}

export function BaseCurrencySelector<T extends FieldValues>({
  name,
  disabled = false,
}: BaseCurrencySelectorProps<T>) {
  const { control } = useFormContext<T>();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <div className={s.currencySelector}>
      {CURRENCIES.map((currency) => (
        <label
          htmlFor={currency.value}
          className={clsx(
            s.option,
            value === currency.value && s.selected,
          )}
          key={currency.value}
        >
          <input
            type="radio"
            id={currency.value}
            value={currency.value}
            checked={value === currency.value}
            onChange={() => onChange(currency.value)}
            className={s.input}
            disabled={disabled}
          />
          <span className={s.label}>
            {currency.label}
          </span>
        </label>
      ))}
    </div>
  );
}
