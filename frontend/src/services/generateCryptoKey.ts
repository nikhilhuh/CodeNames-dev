export const generateCryptoKey = (): string => {
  let key = sessionStorage.getItem("encryptionKey");
  if (!key) {
    key = Math.random().toString(36).substr(2, 12).toLowerCase();
    sessionStorage.setItem("encryptionKey", key);
  }
  return key;
};
