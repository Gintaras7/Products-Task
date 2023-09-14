<script>
import { defineComponent } from "vue";
import ProductItem from "~/pages/ProductItem.vue";
import SearchableInput from "~/components/SearchableInput.vue";

export default defineComponent({
  name: "Products",
  components: {
    ProductItem,
    SearchableInput,
  },
  data() {
    return {
      pageItems: [],
      currentPage: 1,
      enteredSearchValue: "",
      searchForText: "",
    };
  },
  computed: {
    products() {
      return this.$store.state.products.filter(
        ({ title, description }) =>
          title.includes(this.searchForText) ||
          description.includes(this.searchForText)
      );
    },
  },
  methods: {
    onSearch(val) {
      this.searchForText = val;
    },
    onPageUpdate(itemsInPage) {
      this.pageItems = itemsInPage;
    },
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    },
  },
});
</script>

<template>
  <v-container>
    <template>
      <searchable-input
        :placeholder="$t('product.searchFor')"
        v-model="enteredSearchValue"
        @debounced="onSearch"
      />
    </template>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="product in pageItems"
        :key="product.id"
      >
        <product-item :product="product" @addToCart="addProductToCart" />
      </v-col>
    </v-row>
    <pagination
      :items="products"
      v-model="currentPage"
      @page-changed="onPageUpdate"
    />
  </v-container>
</template>
