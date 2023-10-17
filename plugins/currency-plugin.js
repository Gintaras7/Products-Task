import { formatCurrency } from "@utils/currency-formatter";

export default (context, inject) => {
  inject("formatCurrency", formatCurrency);
};
