<script>
import { defineComponent } from "vue";
import ProductsGrid from "~/components/products/ProductsGrid.vue";

export default defineComponent({
  name: "Wishes",
  components: {
    ProductsGrid,
  },
  computed: {
    wishedProductList() {
      return this.$store.state.wishList.items;
    },
  },
});
</script>

<template>
  <v-container>
    <template v-if="wishedProductList.length === 0">
      {{ $t("wishes.noEntries") }}
    </template>
    <products-grid :products="wishedProductList" v-else />
  </v-container>
</template>
