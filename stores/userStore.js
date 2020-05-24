import * as remx from "remx";

const initialState = {
  products: {
    data: [],
    more: true,
    total: 0,
  },
  recentProducts: [],
  search: {
    category: "all",
    keyword: "",
  },
};

const state = remx.state(initialState);

const setters = remx.setters({
  setProducts(items) {
    state.products.data = items;
  },
  setProductTotal(value) {
    state.products.total = value;
  },
  addProducts(items) {
    state.products.data = state.products.data.concat(items);
  },
  setMoreProducts(flag) {
    state.products.more = flag;
  },
  setRecentProducts(items) {
    state.recentProducts = items;
  },
  setSearch(category, keyword) {
    state.search = { category, keyword };
  },
});

const getters = remx.getters({
  getProducts() {
    return state.products.data;
  },
  getProductTotal() {
    return state.products.total;
  },
  hasMoreProducts() {
    return state.products.more;
  },
  getRecentProducts() {
    return state.recentProducts;
  },
  getSearch() {
    return state.search;
  },
});

export default {
  ...getters,
  ...setters,
};
