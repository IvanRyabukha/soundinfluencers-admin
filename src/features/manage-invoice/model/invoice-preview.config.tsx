import React from "react";
import { EditableInvoiceField } from "@/features/manage-invoice/ui/editable-invoice-field/editable-invoice-field.tsx";
import type { IInvoice } from "@/entities/invoice/model/invoice.types.ts";

export type TToField<T> = {
  key: keyof T;
  render?: (data: T) => React.ReactNode;
}

export const toFields = [
  {
    key: "company",
    render: (data) => (
      <EditableInvoiceField
        initialValue={data.company}
        invoiceId={data.invoiceId}
        fieldKey="company"
      />
    ),
  },
  {
    key: "address",
    render: (data) => (
      <EditableInvoiceField
        initialValue={data.address}
        invoiceId={data.invoiceId}
        fieldKey="address"
      />
    ),
  },
  {
    key: "country",
    render: (data) => (
      <EditableInvoiceField
        initialValue={data.country}
        invoiceId={data.invoiceId}
        fieldKey="country"
      />
    )
  },
] satisfies TToField<IInvoice>[];

