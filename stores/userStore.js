import * as remx from "remx";

const initialState = {
  products: {
    data: [],
    more: true,
  },
};

const state = remx.state(initialState);

const setters = remx.setters({
  setProducts(items) {
    state.products.data = items;
  },
  addProducts(items) {
    state.products.data = state.products.data.concat(items);
  },
  setMoreProducts(flag) {
    state.products.more = flag;
  },
});

const getters = remx.getters({
  getProducts() {
    return state.products.data;
  },
  hasMoreProducts() {
    return state.products.more;
  },
});

export default {
  ...getters,
  ...setters,
};
