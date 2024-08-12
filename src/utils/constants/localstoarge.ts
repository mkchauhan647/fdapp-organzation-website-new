export const getLocalStorageItem = (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };

  // Function to safely remove data from localStorage
export const removeStorageItem = (key: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  };