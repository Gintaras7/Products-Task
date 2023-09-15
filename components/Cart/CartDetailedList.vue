<script>
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CartDetailedList",
  computed: {
    ...mapGetters(["productsInCart", "cartTotalPrice"]),
    cartItems() {
      return this.productsInCart;
    },
    total() {
      return this.cartTotalPrice;
    },
  },
});
</script>

<template>
  <div>
    <v-list>
      <v-list-item v-for="item in cartItems" :key="item.id">
        <v-list-item-content>
          <p>{{ item.title }} - {{ item.price }} ({{ item.quantity }})</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <div class="pl-4 pt-3">
      <p>{{ $t("cart.total") }}: {{ total }}</p>
      <v-btn to="/cart" color="primary" depressed>{{ $t("cart.view") }}</v-btn>
    </div>
  </div>
</template>
