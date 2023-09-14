<script>
import { defineComponent } from "vue";
import ProductItem from "~/components/ProductItem.vue";
import SearchableInput from "@ui/SearchableInput.vue";
import ProductsGrid from "../components/ProductsGrid.vue";

export default defineComponent({
  name: "Products",
  components: {
    ProductItem,
    SearchableInput,
    ProductsGrid,
  },
  data() {
    return {
      enteredSearchValue: "",
      searchForText: "",
    };
  },
  computed: {
    products() {
      return this.$store.state.products.filter(({ title, description }) => {
        if (title.indexOf(this.searchForText) > -1) {
          return true;
        }

        return description.indexOf(this.searchForText) > -1;
      });
    },
  },
  methods: {
    initProductsFiltering(val) {
      this.searchForText = val;
    },
    onPageUpdate(itemsInPage) {
      this.pageItems = itemsInPage;
    },
  },
});
</script>

<template>
  <v-container>
    <products-grid :products="products">
      <searchable-input
        :placeholder="$t('product.searchFor')"
        v-model="enteredSearchValue"
        @debounced="initProductsFiltering"
      />
    </products-grid>
  </v-container>
</template>
