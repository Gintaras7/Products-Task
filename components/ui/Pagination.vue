<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    pageSize: {
      type: Number,
      default: 3,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  mounted() {
    this.changeToPage(this.value);
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.pageSize);
    },
    itemsInPage() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.items.slice(startIndex, endIndex);
    },
  },
  methods: {
    changeToPage(value) {
      this.currentPage = value;
      this.$emit("input", value);
      this.$emit("page-changed", this.itemsInPage);
    },
  },
  watch: {
    totalPages: function (newVal, oldVal) {
      this.changeToPage(1);
    },
  },
});
</script>

<template>
  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    @input="changeToPage"
  />
</template>
