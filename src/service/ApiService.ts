import { environment } from "../environment/environment";
import { Post } from "../model/Post";
import { UserLogin } from "../model/User";

export async function getAllPosts(){
    const options = {method: 'GET'};
    const response = await fetch(environment.apiUrl + 'post', options);
    const data = await response.json();
    return data;
}

export async function getAllUsers(){
    const options = {method: 'GET'};
    const response = await fetch(environment.apiUrl + 'user', options);
    const data = await response.json();
    return data;
}

export async function postUserLogin(user:UserLogin){
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(user)};
    const response = await fetch(environment.apiUrl + 'login', options);
    const data = await response.json();
    return data;
}

export async function sendPost(post:Post){
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(post)};
    const response = await fetch(environment.apiUrl + 'post', options);
    const data = await response.json();
    return data;
}