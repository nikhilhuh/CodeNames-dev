import CryptoJS from "crypto-js";

export const updateSessionStorage = (key: string, value: any) => {
  if (key === "roomDetails") {
    const encryptedData = encryptData(JSON.stringify(value));
    sessionStorage.setItem(key, encryptedData);
  } else {
    sessionStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
  }
  const event = new Event("storage");
  window.dispatchEvent(event);
};

const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, "your-secret-key").toString(); 
};
