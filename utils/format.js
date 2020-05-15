import { productCategories } from "../config/arrays";
import { SITE_URL } from "../config/site";

export function currencyFormat(num, withCurrencySymbol = true) {
  if (!num) return "0";
  let value = Number(num)
    .toFixed(0)
    .toString()
    .replace(".", ",") // replace decimal point character with ,
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // use . as a separator

  if (withCurrencySymbol) return `Rp. ${value}`;
  else return value;
}

export function isValidPhoneNumber(number) {
  //const regex = /^(^62|^08){1}\d{8,12}$/gm; //62 or 08
  const regex = /^(^08){1}\d{8,12}$/gm;
  return regex.test(number);
}

export function getCategoryName(value) {
  let el = productCategories.find((p) => p.value == value);
  if (el) return el.text;
  return "Kategory tidak ditemukan";
}

export function instagramUrl(name) {
  return `https://instagram.com/${name}`;
}

export function callUrl(number) {
  return `tel:+${number}`;
}

export function whatsappUrl(number, text) {
  return `https://api.whatsapp.com/send?phone=${number}&text=${
    text ? encodeURIComponent(text) : ""
  }`;
}

export function productUrl(product, withDomain) {
  if (!product) return undefined;
  return `${withDomain ? SITE_URL : ""}/p/${product ? product.slug : "-"}/${
    product._id
  }`;
}

export function storeUrl(store, withDomain) {
  if (!store) return undefined;
  return `${withDomain ? SITE_URL : ""}/toko/${store ? store.slug : "-"}/${
    store._id
  }`;
}

export function seoTitle(title) {
  if (title.length < 46) return `${title} | Karsagi Market`;
  else return `${title}`;
}

export function seoDescription(desc) {
  if (!desc) return undefined;
  return desc.substr(0, 150);
}
