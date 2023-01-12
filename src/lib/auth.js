import storage from "../utils/storage";
import { getUser, loginWithEmail, registerWithEmail } from "../apis";

export async function loginFn(data) {
  const response = await loginWithEmail(data);
  storage.setToken(response.data.token);
  return response;
}

export async function registerFn(data) {
  const response = await registerWithEmail(data);
  storage.setToken(response.data.token);
  return response;
}

export async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin);
}

export async function verifyUser() {
  if (storage.getToken()) {
    const response = await getUser();
    return response.status === 200 ? response.data : null;
  }
  return null;
}
