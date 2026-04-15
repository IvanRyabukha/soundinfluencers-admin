import { useMemo } from "react";
import {
  useController,
  useFormContext,
  useWatch,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { CountryAutocomplete } from "@/shared/ui";
import { COUNTRIES_LIST } from "@/widgets/influencers/influencer-account-form/model";

interface CountryItem {
  country: string | null;
}

interface BaseCountryAutocompleteFieldProps<T extends FieldValues> {
  name: Path<T>;
  countriesName: Path<T>;
  index: number;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export function BaseCountryAutocompleteField<T extends FieldValues>({
  name,
  countriesName,
  index,
  placeholder,
  label,
  disabled = false,
}: BaseCountryAutocompleteFieldProps<T>) {
  const { control } = useFormContext<T>();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const allCountries = useWatch({
    control,
    name: countriesName,
  }) as CountryItem[] | undefined;

  const excludeCountries = useMemo(() => {
    const nextSet = new Set<string>();

    (allCountries ?? []).forEach((item, currentIndex) => {
      if (currentIndex === index) return;
      if (item?.country) nextSet.add(item.country);
    });

    return nextSet;
  }, [allCountries, index]);

  return (
    <CountryAutocomplete
      name={String(name)}
      value={value ?? null}
      placeholder={placeholder}
      label={label}
      disabled={disabled}
      countries={COUNTRIES_LIST}
      excludeCountries={excludeCountries}
      onCommit={onChange}
    />
  );
}
