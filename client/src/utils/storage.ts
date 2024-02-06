// LocalStorage helper function
export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string): string => {
  return localStorage.getItem(key) || "";
};

export const deleteLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

// Cookie helper functions
export const setCookie = (name: string, value: string, days: number) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieValue =
    encodeURIComponent(value) +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";

  document.cookie = name + "=" + cookieValue;
};

export const deleteCookie = (name: string) => {
  const deletionDate = new Date(0); // Set expiration date to a past time
  const cookieValue = "; expires=" + deletionDate.toUTCString() + "; path=/";

  document.cookie = name + "=" + cookieValue;
};

export const setSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const getSessionStorage = (key: string): string => {
  return sessionStorage.getItem(key) || "";
};

export const deleteSession = (key: string) => {
  sessionStorage.removeItem(key);
};

export const addToStrorage = (
  key: string,
  value: string,
  expiration: number = 2
) => {
  if (expiration != -1) {
    setCookie(key, value, expiration);
  } else {
    setSessionStorage(key, value);
  }
};

export const emptyStorage = () => {
  deleteCookie("auth");
  deleteSession("auth");
  deleteLocalStorage("auth");
};
