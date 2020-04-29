import * as remx from "remx";

const initialState = {
  products: {
    data: [],
    page: 1,
  },
};

const state = remx.state(initialState);

const setters = remx.setters({
  setProducts(items) {
    state.products.data = items;
  },
});

const getters = remx.getters({
  getProducts() {
    return state.products.data;
  },
});

export default {
  ...getters,
  ...setters,
};
