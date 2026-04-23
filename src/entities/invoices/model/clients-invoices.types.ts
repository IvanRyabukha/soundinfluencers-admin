export type TInvoiceStatus = "submitted" | "paid";

export interface IClientInvoiceTableRowDto {
  invoiceId: string;
  company: string;
  campaignName: string;
  date: string;
  amount: number;
  status: TInvoiceStatus;
}

export type TGetClientsInvoicesParams =
  {
    search: string;
    page?: never;
    limit?: never;
  }
  |
  {
    page: number;
    limit: number;
    search?: never;
  };

export interface IClientsInvoicesListPayload {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  items: IClientInvoiceTableRowDto[];
}

export interface IClientsInvoicesListResponse {
  statusCode: number;
  message: string;
  data: IClientsInvoicesListPayload;
}
