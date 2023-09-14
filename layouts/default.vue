<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <language-select />
      <v-btn icon @click.stop="showCart">
        <v-badge
          :value="cartItemCount"
          overlap
          color="red"
          :content="cartItemCount"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" right temporary fixed>
      <cart-details />
    </v-navigation-drawer>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import LanguageSelect from "@ui/LanguageSelect.vue";

export default {
  name: "DefaultLayout",
  components: { LanguageSelect },
  data() {
    return {
      drawer: false,
      rightDrawer: false,
      title: "Front-end task",
    };
  },
  computed: {
    ...mapGetters(["cartItemCount"]),
    items() {
      return [
        {
          icon: "mdi-home",
          title: this.$t("layout.home"),
          to: "/",
        },
        {
          icon: "mdi-view-dashboard",
          title: this.$t("layout.products"),
          to: "/products",
        },
        {
          icon: "mdi-heart",
          title: this.$t("layout.wishList"),
          to: "/wishes",
        },
      ];
    },
  },
  mounted() {
    this.$store.dispatch("loadProducts");
  },

  methods: {
    showCart() {
      this.rightDrawer = !this.rightDrawer;
    },
  },
};
</script>
