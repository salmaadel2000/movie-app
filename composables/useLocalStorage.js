export default function useLocalStorage() {
    const getItem = (key) => {
      const value = localStorage.getItem(key);
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    };
  
    const setItem = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    };
  
    const removeItem = (key) => {
      localStorage.removeItem(key);
    };
  
    return {
      getItem,
      setItem,
      removeItem
    };
  }
  