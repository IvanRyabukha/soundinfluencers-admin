import React from "react";
import { InvoiceRow } from "@/widgets/clients-invoices/clients-invoice-preview/ui/invoice-row/invoice-row.tsx";

interface ClientInvoicePreviewFromProps {
  className?: string;
}

export const ClientInvoicePreviewFrom: React.FC<ClientInvoicePreviewFromProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <InvoiceRow
        value={"Techno TV LTD"}
      />
      <InvoiceRow
        label={"Chamber of commerce:"}
        value={"10458319"}
      />
      <InvoiceRow
        label={"Email address:"}
        value={"admin@soundinfluencers.com"}
      />
      <InvoiceRow
        label={"Phone number:"}
        value={"+44 7537 129190"}
      />
      <InvoiceRow
        label={"Address:"}
        value={"124 City Road, EC1V 2NX, London, England - UK"}
      />
    </div>
  );
};
