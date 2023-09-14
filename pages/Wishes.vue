<script>
import { defineComponent } from "vue";
import ProductsGrid from "~/components/ProductsGrid.vue";

export default defineComponent({
  name: "Wishes",
  components: {
    ProductsGrid,
  },
  data() {
    return {
      wishedProductList: [],
    };
  },
  mounted() {
    this.wishedProductList = this.$store.state.wishList.items;
  },
});
</script>

<template>
  <v-container>
    <products-grid :products="wishedProductList" />
  </v-container>
</template>
