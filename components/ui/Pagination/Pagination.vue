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
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.pageSize);
    },
    pageItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      return this.items.slice(startIndex, endIndex);
    },
  },
  methods: {
    changeToPage(value) {
      this.currentPage = value;
      this.$emit("input", value);
    },
  },
});
</script>

<template>
  <div>
    <slot :page-items="pageItems" />
    <div class="d-flex justify-start ml-n2 mt-4">
      <v-pagination v-model="currentPage" :length="totalPages" />
    </div>
  </div>
</template>
