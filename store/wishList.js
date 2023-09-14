export const state = {
    items: [],
};

export const getters = {
    products: (state) => state.items,
};

export const actions = {
    add({ commit }, item) {
        commit("ADD_TO_WISH_LIST", item);
    },
    remove({ commit }, item) {
        commit("REMOVE_FROM_WISH_LIST", item);
    },
};

export const mutations = {
    ADD_TO_WISH_LIST: (state, item) => {
        if (!state.items.find(({ id }) => id === item.id)) {
            state.items.push(item);
        }
    },
    REMOVE_FROM_WISH_LIST: (state, item) => {
        const index = state.items.findIndex(({ id }) => id === item.id);

        if (index !== -1) {
            state.items.splice(index, 1);
        }
    },
};
