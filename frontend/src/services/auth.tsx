import { redirect } from "react-router-dom";

export function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("access");
  localStorage.removeItem("expiration");
  return redirect("/");
}

export function isLogged() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
}
export function hasAccessToStages() {
  /* const accessJSON = localStorage.getItem("access");
  if (accessJSON !== null) {
    const access: any = accessJSON ? JSON.parse(accessJSON) : {};
    return access.stages.general;
  } */

  return true;
}

export function hasAccessToUsers() {
 /*  const accessJSON = localStorage.getItem("access");
  if (accessJSON !== null) {
    const access: any = accessJSON ? JSON.parse(accessJSON) : {};

    return access.usersNav.general;
  } */
  return true;
}
