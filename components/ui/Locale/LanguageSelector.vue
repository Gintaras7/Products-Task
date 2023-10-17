<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" text tile>
        {{ currentLocale }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in locales" :key="index">
        <v-list-item-title
          @click="onLanguageSwitch(item.code)"
          class="cursor-pointer"
        >
          {{ item.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "LanguageSelector",
  computed: {
    locales() {
      return this.$i18n.locales.map(({ code }) => ({
        code,
        text: code.toUpperCase(),
      }));
    },
    currentLocale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    onLanguageSwitch(localeCode) {
      this.$i18n.setLocale(localeCode);
    },
  },
};
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
