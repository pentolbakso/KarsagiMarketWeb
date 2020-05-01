export function isValidPhoneNumber(number) {
  //const regex = /^(^62|^08){1}\d{8,12}$/gm; //62 or 08
  const regex = /^(^62){1}\d{8,13}$/gm;
  return regex.test(number);
}
