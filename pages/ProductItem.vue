<script>
import { defineComponent } from "vue";
import WishListToggle from "~/components/WishListToggle.vue";

export default defineComponent({
  name: "ProductItem",
  props: ["product"],
  components: { WishListToggle },
});
</script>

<template>
  <v-card>
    <v-card-title>
      {{ product.title }}
      <wish-list-toggle :product="product" />
    </v-card-title>
    <v-card-subtitle>{{ $formatCurrency(product.price) }}</v-card-subtitle>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="$emit('addToCart', product)">{{
        $t("cart.add")
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
