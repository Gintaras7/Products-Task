<script>
import { defineComponent } from "vue";
import { debounce } from "@utils/debounce";

export default defineComponent({
  name: "SearchableInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    delay: {
      type: Number,
      default: 250,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      entered: "",
      initDebounceFunction: debounce(this.onDebounceResult),
    };
  },
  mounted() {
    this.entered = this.value;
  },
  methods: {
    onTextChanged(val) {
      this.$emit("input", val);
      this.initDebounceFunction(val);
    },
    onDebounceResult(val) {
      this.$emit("debounced", val);
    },
  },
});
</script>

<template>
  <v-text-field
    v-model="entered"
    :placeholder="placeholder"
    @input="onTextChanged"
    clearable
    solo
    prepend-inner-icon="mdi mdi-magnify"
  />
</template>
