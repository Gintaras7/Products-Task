<script>
import { mapGetters } from "vuex";
import { WISH_LIST_GETTER } from "~/constants/store/getter-types";
import {
  WISH_ADD_TO_LIST_ACTION,
  WISH_REMOVE_FROM_LIST_ACTION,
} from "../constants/store/action-types";

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
      const actionType = this.isInList
        ? WISH_REMOVE_FROM_LIST_ACTION
        : WISH_ADD_TO_LIST_ACTION;

      this.$store.dispatch(actionType, this.product);
    },
  },
  computed: {
    ...mapGetters({
      products: "wishList/" + WISH_LIST_GETTER,
    }),
    isInList() {
      return this.products.find(({ id }) => id === this.product.id);
    },
  },
};
</script>
<template>
  <v-btn icon color="pink" @click="toggleWishState">
    <v-icon>
      {{ isInList ? "mdi-heart" : "mdi-heart-outline" }}
    </v-icon>
  </v-btn>
</template>
