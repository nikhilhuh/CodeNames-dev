import { encryptData } from "./encryptAndDecrypt";

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


