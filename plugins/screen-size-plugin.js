import { formatCurrency } from "~/utils/currency-formatter";

export default (context, inject) => {
  inject("isSmallScreen", this.$vuetify.breakpoint.smAndDown);
};
