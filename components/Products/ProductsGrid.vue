<script>
import { defineComponent } from "vue";
import ProductItem from "~/components/Products/ProductItem.vue";
import Pagination from "@ui/Pagination/Pagination.vue";

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
      currentPage: 1,
    };
  },
  methods: {
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    },
  },
});
</script>

<template>
  <div>
    <slot />
    <pagination :items="products" v-slot="{ pageItems }">
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
    </pagination>
  </div>
</template>
