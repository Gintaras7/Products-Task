<script>
import { defineComponent } from "vue";
import WishListToggler from "~/components/WishListToggler.vue";

export default defineComponent({
  name: "ProductItem",
  components: { WishListToggler },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
});
</script>

<template>
  <v-card>
    <v-card-title class="card-title">
      {{ product.title }}
      <wish-list-toggler :product="product" />
    </v-card-title>
    <v-card-subtitle>{{ $formatCurrency(product.price) }}</v-card-subtitle>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-card-actions>
      <slot name="actions"> </slot>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
