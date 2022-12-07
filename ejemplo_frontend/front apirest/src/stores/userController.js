/** Store de usuarios */
import { writable } from "svelte/store";
export const users = writable([]);

// URL de la API
export const url = "http://localhost:3000/users/";

// Metodos CRUD
export async function GETUsers() {
  const response = await fetch(url, { method: "GET" });
  return await response.json();
}

/** @param {Number} id */
export async function DELETEUsers(id) {
  const response = await fetch(url + id, { method: "DELETE" });
  users.set(await response.json());
}
