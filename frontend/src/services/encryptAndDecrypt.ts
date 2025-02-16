import { generateCryptoKey } from "./generateCryptoKey";
import CryptoJS from "crypto-js";

const key = generateCryptoKey();

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

export const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
