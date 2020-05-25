export const productCategories = [
  { key: "sembako", value: "sembako", text: "Sembilan Bahan Pokok" },
  { key: "food", value: "food", text: "Makanan & Minuman" },
  { key: "book", value: "book", text: "Buku" },
  { key: "fashion", value: "fashion", text: "Pakaian" },
  { key: "health", value: "health", text: "Kesehatan" },
  { key: "electronic", value: "electronic", text: "Alat elektronik" },
  { key: "automotive", value: "automotive", text: "Otomotif" },
  { key: "service", value: "service", text: "Jasa / Non-Barang" },
  { key: "other", value: "other", text: "Lain-Lain" },
];

export const productCategoriesWithAll = [
  {
    key: "all",
    value: "all",
    text: "Semua Kategori",
  },
].concat(productCategories);
