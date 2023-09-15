<script>
import { defineComponent } from "vue";
import ProductsGrid from "~/components/Products/ProductsGrid.vue";
import SearchableInput from "@ui/SearchableInput.vue";
import { searchForValuesInObjects } from "~/utils/search-in-object";

export default defineComponent({
  name: "Products",
  components: {
    SearchableInput,
    ProductsGrid,
  },
  data() {
    return {
      enteredSearchValue: "",
      textToSearch: "",
    };
  },
  computed: {
    filteredProducts() {
      const checkInFields = ["description", "title"];

      return searchForValuesInObjects(
        this.$store.state.products,
        this.textToSearch,
        checkInFields
      );
    },
  },
  methods: {
    initProductsFiltering(val) {
      this.textToSearch = val;
    },
    onPageUpdate(itemsInPage) {
      this.pageItems = itemsInPage;
    },
  },
});
</script>

<template>
  <v-container>
    <products-grid :products="filteredProducts">
      <searchable-input
        :placeholder="$t('product.searchFor')"
        v-model="enteredSearchValue"
        @debounced="initProductsFiltering"
      />
    </products-grid>
  </v-container>
</template>
