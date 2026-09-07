import api from "./api";

export async function login(email, password) {
  const res = await api.post("/api/auth/login", { email, password });
  const data = res.data;
  if (data.token) localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

export async function register(payload) {
  return (await api.post("/api/auth/register", payload)).data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
