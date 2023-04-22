import { redirect } from "react-router-dom";

export function logOut(){
    
    localStorage.removeItem('token');
    localStorage.removeItem('access');
    localStorage.removeItem('expiration');
    return redirect('/')
}

export function tokenAndAccesLoader(){
    
    return getAuthTokenAndAccess();

}

export function isLogged(){
    const token = localStorage.getItem('token');
    return token;
}
export function hasAccess(component:String){
    const access = localStorage.getItem('access');
    return access;
}

export function getAuthTokenAndAccess(){
    const token = localStorage.getItem('token');
    const access = localStorage.getItem('access');
    return token;
}