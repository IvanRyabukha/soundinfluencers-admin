export const parseInvoiceAddress = (address: string) => {
  const parts = address.split(",").map(p => p.trim());

  const addressLine1 = parts[0] ?? "";

  let postcode = "";
  let city = "";
  const country = parts[2] ?? "";

  if (parts[1]) {
    const match = parts[1].match(/^(\d+)\s+(.*)$/);

    if (match) {
      postcode = match[1];
      city = match[2];
    } else {
      city = parts[1];
    }
  }

  const addressLine2 = [city, country].filter(Boolean).join(", ");

  return {
    addressLine1,
    addressLine2,
    postcode,
  };
};
