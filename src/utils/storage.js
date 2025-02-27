const storagePrefix = "auth_";

const storage = {
  getToken: () => {
    if (typeof localStorage.getItem(`${storagePrefix}token`) === "string") {
      return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`));
    } else {
      return null;
    }
  },
  setToken: (token) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
