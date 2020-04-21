import * as remx from "remx";

const initialState = {
  shop: null,
  products: [],
};

const state = remx.state(initialState);

const setters = remx.setters({
  setShop(shop) {
    state.shop = shop;
  },
  setProducts(items) {
    state.products = items;
  },
});

const getters = remx.getters({
  getShop() {
    return state.shop;
  },
  getProducts() {
    return state.products;
  },
});

export default {
  ...getters,
  ...setters,
};
