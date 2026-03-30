import React from "react";
import clsx from "clsx";
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

interface FormProps<TFieldValues extends FieldValues> {
  children: React.ReactNode;
  className?: string;
  methods: UseFormReturn<TFieldValues>;
  onSubmit?: (e?: React.BaseSyntheticEvent) => void;
}

export const Form = <TFieldValues extends FieldValues>({
  children,
  className,
  methods,
  onSubmit,
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...methods}>
      <form className={clsx(className)} onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};
