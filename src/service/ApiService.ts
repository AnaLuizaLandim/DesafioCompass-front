import { environment } from "../environment/environment";

export async function getAllPosts(){
    const response = await fetch(environment.apiUrl + 'post');
    const data = await response.json();
    return data;
}