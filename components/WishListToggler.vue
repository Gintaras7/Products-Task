<template>
  <v-btn icon color="pink" @click="toggleWishState">
    <v-icon>
      {{ isInList ? "mdi-heart" : "mdi-heart-outline" }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WishListToggler",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleWishState() {
      const actionType = this.isInList ? "remove" : "add";

      this.$store.dispatch(`wishList/${actionType}`, this.product);
    },
  },
  computed: {
    ...mapGetters({
      products: "wishList/products",
    }),
    isInList() {
      return this.products.find(({ id }) => id === this.product.id);
    },
  },
};
</script>
