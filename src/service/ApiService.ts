import { environment } from "../environment/environment";
import { Post } from "../model/Post";
import { UserLogin, UserRegister } from "../model/User";

export async function getAllPosts(){
    const options = {method: 'GET'};
    const response = await fetch(environment.apiUrl + 'posts', options);
    const data = await response.json();
    console.log(data);
    return data;
}



export async function getAllComments() {
    const options = {method: 'GET'};
    const response = await fetch(environment.apiUrl + 'posts', options);
    const data = await response.json();
    // console.log(data);
    return data;
}


export async function getAllData() {
    const postOptions = { method: 'GET' };
    const postResponse = await fetch(environment.apiUrl + 'posts', postOptions);
    const postData = await postResponse.json();
    // console.log(postData);
  
    const commentOptions = { method: 'GET' };
    const commentResponse = await fetch(environment.apiUrl + 'comments', commentOptions);
    const commentData = await commentResponse.json();
    // console.log(commentData);
  
    const combinedData = postData.map((post:any) => {
      const comments = commentData.filter((comment:any) => comment.post_id === post.id);
      return { ...post, comments };
    });
  
    // console.log(combinedData);
    return combinedData;
  }
export async function getAllUsers(){
    const options = {method: 'GET'};
    const response = await fetch(environment.apiUrl + 'users', options);
    const data = await response.json();
    return data;
}

export async function postUserLogin(user:UserLogin){
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(user)};
    const response = await fetch(environment.apiUrl3 + 'login', options);
    const data = await response.json();
    return data;
}


export async function sendPost(post:Post){
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(post)};
    const response = await fetch(environment.apiUrl + 'posts', options);
    const data = await response.json();
    console.log(data)
    return data;
}
export async function postUserRegister(user:UserRegister){
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(user)};
    const response = await fetch(environment.apiUrl + 'users', options);
    const data = await response.json();
    return data;
}