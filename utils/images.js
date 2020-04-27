import { API_URL } from "../services/api";

const UPLOAD_PATH = "/uploads/images";
export function imageOri(filename) {
  return `${API_URL}/${UPLOAD_PATH}/ori/${filename}`;
}
export function image200(filename) {
  return `${API_URL}/${UPLOAD_PATH}/200/${filename}.webp`;
}
export function image600(filename) {
  return `${API_URL}/${UPLOAD_PATH}/600/${filename}.webp`;
}
