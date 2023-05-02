import { environment } from "../environment/environment";

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