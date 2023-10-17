<template>
  <v-app>
    <bottom-navigation :navigation-links="navigationLinks" v-if="isMobile" />
    <top-navigation
      v-model="isMainDrawerOpen"
      :navigation-links="navigationLinks"
      v-else
    />

    <v-app-bar fixed app>
      <v-app-bar-nav-icon
        v-if="!isMobile"
        @click.stop="isMainDrawerOpen = !isMainDrawerOpen"
      />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <language-selector />
      <v-btn icon @click.stop="showCartDrawer">
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
    <v-navigation-drawer
      v-model="isCartDrawerOpen"
      :right="!isMobile"
      :bottom="isMobile"
      temporary
      fixed
    >
      <cart-detailed-list />
    </v-navigation-drawer>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import CartDetailedList from "~/components/Cart/CartDetailedList.vue";
import LanguageSelector from "@ui/Locale/LanguageSelector.vue";
import TopNavigation from "@ui/Navigation/TopNavigation.vue";
import BottomNavigation from "@ui/Navigation/BottomNavigation.vue";
import screenMixin from "@mixins/screenMixin";

export default {
  name: "DefaultLayout",
  components: {
    LanguageSelector,
    CartDetailedList,
    TopNavigation,
    BottomNavigation,
  },
  mixins: [screenMixin],
  data() {
    return {
      isMainDrawerOpen: false,
      isCartDrawerOpen: false,
      title: "Front-end task",
    };
  },
  computed: {
    ...mapGetters(["cartItemCount"]),
    navigationLinks() {
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
    showCartDrawer() {
      this.isCartDrawerOpen = !this.isCartDrawerOpen;
    },
  },
};
</script>
