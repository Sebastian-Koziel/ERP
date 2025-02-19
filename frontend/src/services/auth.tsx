import { redirect } from "react-router-dom";
import { storageGetToken } from "../utils/localhostHandlers";

export function storagelogOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("lastViewedStage");
}

export function isLogged() {
  const token = storageGetToken();
  if (!token) {
    console.log(`not logged`);
    return false;
  }
  return true;
}


export function hasAccessToCompanySetup() {
  /* const user = storageGetUser();
  
  if (user !== null) {
    if(user.access.administration.companySetup){
      return true
    }   
  }  */
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

export function hasAccessToStages() {
  return true;
}