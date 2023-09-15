<template>
  <v-bottom-navigation fixed>
    <v-btn
      v-for="(link, i) in navigationLinks"
      :key="i"
      :to="link.to"
      router
      exact
    >
      <span>{{ link.title }}</span>
      <v-icon>{{ link.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNavigation",
  props: {
    navigationLinks: {
      type: Array,
      required: true,
    },
  },
};
</script>
