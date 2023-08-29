import storage from "../utils/storage";
import { getUser, loginWithEmail, registerWithEmail } from "../apis";
import { faker } from "@faker-js/faker";

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

export async function demoLogin() {
  const response = await registerWithEmail({
    email: faker.internet.email(),
    password: faker.internet.password(),
    first_name: "Guest",
    last_name: "User",
  });
  storage.setToken(response.data.token);
  return response;
}
