<template>
  <v-navigation-drawer
    v-model="value"
    @click="$emit('input', !value)"
    fixed
    app
  >
    <v-list>
      <v-list-item
        v-for="(link, i) in navigationLinks"
        :key="i"
        :to="link.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "TopNavigation",
  props: {
    navigationLinks: {
      type: Array,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
