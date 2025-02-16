import { encryptData } from "./encryptAndDecrypt";

export const updateLocalStorage = (key: string, value: any) => {
  if (key === "roomDetails") {
    const encryptedData = encryptData(JSON.stringify(value));
    localStorage.setItem(key, encryptedData);
  } else {
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
  }
  const event = new Event("storage");
  window.dispatchEvent(event);
};


