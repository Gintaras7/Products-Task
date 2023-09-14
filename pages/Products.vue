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
      contentForSearch: "",
      searchForText: "",
      debouncingFunction: debounce(
        (pendingValue) => (this.searchForText = pendingValue)
      ),
    };
  },
  computed: {
    products() {
      const products = this.$store.state.products.filter(
        ({ title, description }) =>
          title.includes(this.searchForText) ||
          description.includes(this.searchForText)
      );

      const pageSize = 3;
      const currentPage = this.$store.state.currentPage;

      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      return products.slice(startIndex, endIndex);
    },
    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(value) {
        this.$store.commit("SET_CURRENT_PAGE", value);
      },
    },
    totalPages() {
      return Math.ceil(this.$store.state.products.length / 3);
    },
  },
  methods: {
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    },
    changePage(value) {
      this.currentPage = value;
    },
  },
});
</script>

<template>
  <v-container>
    <template>
      <v-form>
        <v-text-field
          :placeholder="$t('product.searchFor')"
          v-model="contentForSearch"
          @input="debouncingFunction"
          clearable
          solo
          prepend-inner-icon="mdi mdi-magnify"
        />
      </v-form>
    </template>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="product in products"
        :key="product.id"
      >
        <ProductItem :product="product" @addToCart="addProductToCart" />
      </v-col>
    </v-row>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @input="changePage"
    ></v-pagination>
  </v-container>
</template>
