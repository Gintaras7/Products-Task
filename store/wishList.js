import { WISH_LIST_GETTER } from "../constants/store/getter-types";
import {
  ADD_TO_WISH_LIST,
  REMOVE_FROM_WISH_LIST,
} from "../constants/store/mutation-types";

export const state = () => ({
  items: [],
});

export const getters = {
  [WISH_LIST_GETTER]: (state) => state.items,
};

export const actions = {
  add({ commit }, item) {
    commit(ADD_TO_WISH_LIST, item);
  },
  remove({ commit }, item) {
    commit(REMOVE_FROM_WISH_LIST, item);
  },
};

export const mutations = {
  [ADD_TO_WISH_LIST]: (state, item) => {
    if (!state.items.find(({ id }) => id === item.id)) {
      state.items.push(item);
    }
  },
  [REMOVE_FROM_WISH_LIST]: (state, item) => {
    const index = state.items.findIndex(({ id }) => id === item.id);

    if (index !== -1) {
      state.items.splice(index, 1);
    }
  },
};
