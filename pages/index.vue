<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Index",
  computed: {
    tasks() {
      return Object.keys(this.$t("tasks"));
    },
  },
});
</script>

<template>
  <v-list two-line subheader>
    <v-subheader>{{ $t("task.listTitle") }}</v-subheader>
    <v-list-item-group>
      <v-list-item v-for="(title, index) in tasks" :key="index">
        <v-list-item-content>
          <v-list-item-title :style="{ fontWeight: 'bold' }"
            >{{ $t("task.task") }}:
            {{ $t(`tasks.${title}.title`) }}</v-list-item-title
          >
          <v-list-item-subtitle
            >{{ $t("task.description") }}:
            {{ $t(`tasks.${title}.description`) }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
