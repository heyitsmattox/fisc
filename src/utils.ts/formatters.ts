export const formatCurrency = (val: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};

export const formatPercent = (val: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(val);
};

export const formatDate = (val: string) : string => {
  const date = new Date(val); 
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  })
};