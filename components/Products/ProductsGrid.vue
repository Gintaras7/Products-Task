<script>
import { defineComponent } from "vue";
import ProductItem from "~/components/products/ProductItem.vue";
import Pagination from "@ui/Pagination.vue";

export default defineComponent({
  name: "ProductsGrid",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
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
        <product-item :product="product" @addToCart="addProductToCart">
          <template #actions>
            <v-btn color="primary" @click="addProductToCart(product)">
              {{ $t("cart.add") }}
            </v-btn>
          </template>
        </product-item>
      </v-col>
    </v-row>
    <div class="d-flex justify-start ml-0 mt-4">
      <pagination
        :show="products.length > 0"
        class="ml-n2"
        :items="products"
        v-model="currentPage"
        @page-changed="onPageUpdate"
      />
    </div>
  </div>
</template>
