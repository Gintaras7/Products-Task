import { fetchProductsFromAPI, processCheckout } from "~/mocks/products";

export const state = () => ({
  products: [],
  cart: [],
  currentPage: 1,
});

export const getters = {
  cartTotalPrice: (state) => {
    let total = 0;
    state.cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  },
  productsInCart: (state) => {
    return state.cart;
  },
};

export const mutations = {
  ADD_PRODUCT_TO_CART(state, product) {
    const existingProduct = state.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },
  UPDATE_PRODUCT_AVAILABILITY(state, product) {
    const productIndex = state.products.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      state.products[productIndex].availability =
        product.quantity > 0 ? "In Stock" : "Out of Stock";
    }
  },

  REMOVE_PRODUCT_FROM_CART(state, productId) {
    const productIndex = state.cart.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      const product = state.cart[productIndex];
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.cart.splice(productIndex, 1);
      }
    }
  },
  CLEAR_CART(state) {
    state.cart = [];
  },
  UPDATE_PRODUCT_DETAILS(state, product) {
    const productIndex = state.products.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      state.products[productIndex] = {
        ...state.products[productIndex],
        ...product,
      };
    }
  },
  SET_CART_ITEMS(state, items) {
    state.cart = items;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  INCREMENT_PRODUCT_QUANTITY(state, productId) {
    const product = state.cart.find((item) => item.id === productId);
    if (product) product.quantity += 1;
  },
  DECREMENT_PRODUCT_QUANTITY(state, productId) {
    const product = state.cart.find((item) => item.id === productId);
    if (product && product.quantity > 1) product.quantity -= 1;
  },
};

export const actions = {
  addProductToCart({ commit, state }, product) {
    if (state.products.includes(product)) {
      commit("ADD_PRODUCT_TO_CART", product);
    }

    if (product.quantity > 0) {
      commit("UPDATE_PRODUCT_AVAILABILITY", product);
    }
  },
  removeProductFromCart({ commit }, productId) {
    commit("REMOVE_PRODUCT_FROM_CART", productId);
  },
  clearCart({ commit }) {
    commit("CLEAR_CART");
  },
  updateProductDetails({ commit }, product) {
    commit("UPDATE_PRODUCT_DETAILS", product);
  },
  async loadProducts({ commit }) {
    try {
      const products = await fetchProductsFromAPI(); // Using the previously mocked function
      commit("SET_PRODUCTS", products);
    } catch (error) {
      console.error("An error occurred while fetching products:", error);
    }
  },
  async checkout({ commit, state }) {
    try {
    const success = await processCheckout(state.cart); // Define this function as per your process
    if (success) {
      commit("CLEAR_CART");
    } }catch (error) {
      console.error("An error occurred during checkout process:", error);
    }
  },
  incrementProductQuantity({ commit }, productId) {
    commit("INCREMENT_PRODUCT_QUANTITY", productId);
  },
  decrementProductQuantity({ commit }, productId) {
    commit("DECREMENT_PRODUCT_QUANTITY", productId);
  },
  setCartItems({ commit }, items) {
    commit("SET_CART_ITEMS", items);
  },
};
