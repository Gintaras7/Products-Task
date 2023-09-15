<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Cart",
  computed: {
    cartItems() {
      return this.$store.getters.productsInCart;
    },
    total() {
      return this.$store.getters.cartTotalPrice;
    },
  },
  methods: {
    incrementProductQuantity(item) {
      this.$store.dispatch("incrementProductQuantity", item);
    },
    decrementProductQuantity(item) {
      this.$store.dispatch("decrementProductQuantity", item);
    },
    removeProductFromCart(item) {
      this.$store.dispatch("removeProductFromCart", item);
    },
    checkout() {
      this.$store.dispatch("checkout");
    },
    clearCart() {
      this.$store.dispatch("clearCart");
    },
  },
});
</script>

<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>{{ $t("product.title") }}</th>
          <th>{{ $t("product.price") }}</th>
          <th>{{ $t("product.actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ $formatCurrency(item.price) }}</td>
          <td>
            <v-btn icon @click="incrementProductQuantity(item)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn icon @click="decrementProductQuantity(item)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn icon @click="$emit('removeFromCart', item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
        <tr>
          <td>{{ $t("product.total") }}:</td>
          <td>{{ $formatCurrency(total) }}</td>
          <td>
            <v-btn @click="checkout">{{ $t("cart.add") }}</v-btn>
            <v-btn @click="clearCart">{{ $t("cart.clear") }}</v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
