<script>
import { defineComponent } from "vue";
import ProductItem from "~/components/ProductItem.vue";
import Pagination from "@ui/Pagination.vue";

export default defineComponent({
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  name: "ProductsGrid",
  components: {
    ProductItem,
    Pagination,
  },
  data() {
    return {
      pageItems: [],
      currentPage: 1,
    };
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
  <div>
    <template>
      <slot />
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
    <div class="d-flex justify-start ml-0 mt-4">
      <pagination
        class="ml-n2"
        :items="products"
        v-model="currentPage"
        @page-changed="onPageUpdate"
      />
    </div>
  </div>
</template>
