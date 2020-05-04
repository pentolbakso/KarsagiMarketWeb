import { STATIC_URL } from "../services/api";

const UPLOAD_PATH = "/uploads/images";
export function imageOri(filename) {
  return `${STATIC_URL}/${UPLOAD_PATH}/ori/${filename}`;
}
export function image200(filename) {
  return `${STATIC_URL}/${UPLOAD_PATH}/200/${filename}.jpeg`;
}
export function image600(filename) {
  return `${STATIC_URL}/${UPLOAD_PATH}/600/${filename}.jpeg`;
}
