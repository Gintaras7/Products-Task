<script>
import { defineComponent } from "vue";
import ProductItem from "~/pages/ProductItem.vue";
import { debounce } from "~/utils/debounce";

export default defineComponent({
  name: "Products",
  components: {
    ProductItem,
  },
  data() {
    return {
      pageItems: [],
      currentPage: 1,
      contentForSearch: "",
      searchForText: "",
      debouncingFunction: debounce(
        (pendingValue) => (this.searchForText = pendingValue)
      ),
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
      <v-text-field
        :placeholder="$t('product.searchFor')"
        v-model="contentForSearch"
        @input="debouncingFunction"
        clearable
        solo
        prepend-inner-icon="mdi mdi-magnify"
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
