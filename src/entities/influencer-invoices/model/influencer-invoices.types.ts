import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";
import type { TPaymentMethod } from "@/entities/influencer-history/model/influencer-history-detail.types.ts";
import type { TCurrency } from "@/shared/types/types.ts";

export type TInvoiceStatus = "submitted" | "approved" | "rejected";

export interface IInvoicePartyDetails {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  postcode: string;
  contactName: string;
}

export interface IBillToDetails {
  companyName: string;
  chamberOfCommerce: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IInvoiceSummaryDetails {
  description: string;
  total: number;
  subtotal: number;
  balanceDue: number;
  currency: TCurrency;
}

export interface IInvoiceBankDetails {
  bankName: string;
  beneficiary: string;
  beneficiaryAddress: string;
  sortCode: string;
  accountNumber: string;
}

export interface IInvoiceDetails {
  invoiceNo: string;
  date: string;

  from: IInvoicePartyDetails;
  billTo: IBillToDetails;
  summary: IInvoiceSummaryDetails;

  selectedPaymentMethod: TPaymentMethod;
  paymentTerms: string;

  bankDetails?: IInvoiceBankDetails;
  paypalEmail?: string;
}

export interface IInvoiceTableRow {
  id: string;

  firstName: string;
  lastName: string;

  username: string;
  platform: TSocialMediaValue;

  date: string;

  influencerAmount: number;
  influencerCurrency: string;

  amountEur: number;

  paymentMethod: TPaymentMethod;
  paymentDetails: string;

  status: TInvoiceStatus;
  paid: boolean;

  invoiceDetails: IInvoiceDetails;
}

export const invoicesTableMock: IInvoiceTableRow[] = [
  {
    id: "1",
    firstName: "Sofia",
    lastName: "Smith",
    username: "sonny5",
    platform: "instagram",
    date: "22.10.2025",
    influencerAmount: 80,
    influencerCurrency: "EUR",
    amountEur: 80,
    paymentMethod: "paypal",
    paymentDetails: "jhonnydd@hotmail.com",
    status: "submitted",
    paid: true,
    invoiceDetails: {
      invoiceNo: "69135clfafa0eccd15e7c444",
      date: "11.11.2025",
      from: {
        fullName: "Daniel Dantas",
        addressLine1: "Cassland Road",
        addressLine2: "London, United Kingdom",
        country: "United Kingdom",
        postcode: "E9 5BY",
        contactName: "Daniel Dantas",
      },
      billTo: {
        companyName: "TECHNO TV LTD",
        chamberOfCommerce: "10458319",
        email: "admin@soundinfluencers.com",
        phoneNumber: "+44 7537 129190",
        address: "124 City Road, EC1V 2NX, London, England - UK",
      },
      summary: {
        description: "Daniel Dantas campaign",
        total: 309,
        subtotal: 309,
        balanceDue: 309,
        currency: "EUR",
      },
      selectedPaymentMethod: "paypal",
      paymentTerms: "Within 7 business day",
      paypalEmail: "jhonnydd@hotmail.com",
    },
  },
  {
    id: "2",
    firstName: "Anna",
    lastName: "Smith",
    username: "anna2",
    platform: "tiktok",
    date: "22.10.2025",
    influencerAmount: 222,
    influencerCurrency: "EUR",
    amountEur: 350,
    paymentMethod: "ukBankTransfer",
    paymentDetails: "jhonnydd@hotmail.com",
    status: "submitted",
    paid: false,
    invoiceDetails: {
      invoiceNo: "69135clfafa0eccd15e7c445",
      date: "11.11.2025",
      from: {
        fullName: "Anna Smith",
        addressLine1: "Cassland Road",
        addressLine2: "London, United Kingdom",
        country: "United Kingdom",
        postcode: "E9 5BY",
        contactName: "Anna Smith",
      },
      billTo: {
        companyName: "TECHNO TV LTD",
        chamberOfCommerce: "10458319",
        email: "admin@soundinfluencers.com",
        phoneNumber: "+44 7537 129190",
        address: "124 City Road, EC1V 2NX, London, England - UK",
      },
      summary: {
        description: "Anna Smith campaign",
        total: 350,
        subtotal: 350,
        balanceDue: 350,
        currency: "EUR",
      },
      selectedPaymentMethod: "ukBankTransfer",
      paymentTerms: "Within 7 business day",
      bankDetails: {
        bankName: "Revolut Ltd",
        beneficiary: "Anna Smith",
        beneficiaryAddress: "Cassland road, Harrowgate house, London, UK",
        sortCode: "040075",
        accountNumber: "86344080",
      },
    },
  },
  {
    id: "3",
    firstName: "Sofia",
    lastName: "Smith",
    username: "sonny2",
    platform: "tiktok",
    date: "22.10.2025",
    influencerAmount: 80,
    influencerCurrency: "EUR",
    amountEur: 20000,
    paymentMethod: "internationalBankTransfer",
    paymentDetails: "jhonnydd@hotmail.com",
    status: "submitted",
    paid: true,
    invoiceDetails: {
      invoiceNo: "69135clfafa0eccd15e7c446",
      date: "12.11.2025",
      from: {
        fullName: "Sofia Smith",
        addressLine1: "King Street 18",
        addressLine2: "Manchester, United Kingdom",
        country: "United Kingdom",
        postcode: "M2 6AG",
        contactName: "Sofia Smith",
      },
      billTo: {
        companyName: "TECHNO TV LTD",
        chamberOfCommerce: "10458319",
        email: "admin@soundinfluencers.com",
        phoneNumber: "+44 7537 129190",
        address: "124 City Road, EC1V 2NX, London, England - UK",
      },
      summary: {
        description: "Sofia Smith campaign",
        total: 20000,
        subtotal: 20000,
        balanceDue: 20000,
        currency: "EUR",
      },
      selectedPaymentMethod: "internationalBankTransfer",
      paymentTerms: "Within 7 business day",
      bankDetails: {
        bankName: "Wise",
        beneficiary: "Sofia Smith",
        beneficiaryAddress: "18 King Street, Manchester, United Kingdom",
        sortCode: "230455",
        accountNumber: "55239871",
      },
    },
  },
  {
    id: "4",
    firstName: "Eric",
    lastName: "Smith",
    username: "eric2",
    platform: "tiktok",
    date: "22.10.2025",
    influencerAmount: 222,
    influencerCurrency: "EUR",
    amountEur: 350,
    paymentMethod: "paypal",
    paymentDetails: "jhonnydd@hotmail.com",
    status: "submitted",
    paid: true,
    invoiceDetails: {
      invoiceNo: "69135clfafa0eccd15e7c447",
      date: "13.11.2025",
      from: {
        fullName: "Eric Smith",
        addressLine1: "Baker Street 221B",
        addressLine2: "London, United Kingdom",
        country: "United Kingdom",
        postcode: "NW1 6XE",
        contactName: "Eric Smith",
      },
      billTo: {
        companyName: "TECHNO TV LTD",
        chamberOfCommerce: "10458319",
        email: "admin@soundinfluencers.com",
        phoneNumber: "+44 7537 129190",
        address: "124 City Road, EC1V 2NX, London, England - UK",
      },
      summary: {
        description: "Eric Smith campaign",
        total: 350,
        subtotal: 350,
        balanceDue: 350,
        currency: "EUR",
      },
      selectedPaymentMethod: "paypal",
      paymentTerms: "Within 7 business day",
      paypalEmail: "jhonnydd@hotmail.com",
    },
  },
  {
    id: "5",
    firstName: "Sofia",
    lastName: "Smith",
    username: "sonny2",
    platform: "tiktok",
    date: "22.10.2025",
    influencerAmount: 22,
    influencerCurrency: "EUR",
    amountEur: 22,
    paymentMethod: "paypal",
    paymentDetails: "jhonnydd@hotmail.com",
    status: "submitted",
    paid: true,
    invoiceDetails: {
      invoiceNo: "69135clfafa0eccd15e7c448",
      date: "14.11.2025",
      from: {
        fullName: "Sofia Smith",
        addressLine1: "Cassland Road",
        addressLine2: "London, United Kingdom",
        country: "United Kingdom",
        postcode: "E9 5BY",
        contactName: "Sofia Smith",
      },
      billTo: {
        companyName: "TECHNO TV LTD",
        chamberOfCommerce: "10458319",
        email: "admin@soundinfluencers.com",
        phoneNumber: "+44 7537 129190",
        address: "124 City Road, EC1V 2NX, London, England - UK",
      },
      summary: {
        description: "Mini promo campaign",
        total: 22,
        subtotal: 22,
        balanceDue: 22,
        currency: "EUR",
      },
      selectedPaymentMethod: "paypal",
      paymentTerms: "Within 7 business day",
      paypalEmail: "jhonnydd@hotmail.com",
    },
  },
  {
    id: "6",
    firstName: "Anna",
    lastName: "Smith",
    username: "anna2",
    platform: "tiktok",
    date: "22.10.2025",
    influencerAmount: 12,
    influencerCurrency: "EUR",
    amountEur: 12,
    paymentMethod: "paypal",
    paymentDetails: "jhonnydd@hotmail.com",
    status: "submitted",
    paid: false,
    invoiceDetails: {
      invoiceNo: "69135clfafa0eccd15e7c449",
      date: "15.11.2025",
      from: {
        fullName: "Anna Smith",
        addressLine1: "West End Avenue",
        addressLine2: "Leeds, United Kingdom",
        country: "United Kingdom",
        postcode: "LS1 4AP",
        contactName: "Anna Smith",
      },
      billTo: {
        companyName: "TECHNO TV LTD",
        chamberOfCommerce: "10458319",
        email: "admin@soundinfluencers.com",
        phoneNumber: "+44 7537 129190",
        address: "124 City Road, EC1V 2NX, London, England - UK",
      },
      summary: {
        description: "Anna campaign",
        total: 12,
        subtotal: 12,
        balanceDue: 12,
        currency: "EUR",
      },
      selectedPaymentMethod: "paypal",
      paymentTerms: "Within 7 business day",
      paypalEmail: "jhonnydd@hotmail.com",
    },
  },
];
