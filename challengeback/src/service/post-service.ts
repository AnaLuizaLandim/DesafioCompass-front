import { PostsData } from "../constants/posts.constant";
import { Post } from "../model/post.model";
import { openDbLocal } from "../repository/configdb";
import  sqlite3  from "sqlite3";
export const getAllPosts = () => {
    const data = PostsData.posts;
    return data;
}
//postagem
// export const savePost = (post: Post) => {
//     PostsData.posts = [post, ...PostsData.posts]; 
//     return post;
// }

export const savePost = (post: Post) => {
    PostsData.posts.unshift(post);
    return post;
}
export function getPostById(id: number) {
    
    const db = new sqlite3.Database('./database.db')
    const query =(`SELECT * FROM posts WHERE id = ? LIMIT 1 OFFSET 0`);
    return new Promise((resolve,reg)=>{
        db.get(query, [id], (error,row)=>{
            db.close();
            if(error){
              reg(error);
            }
            else{
                resolve(row);
            }
        })     
    })
}
export default async function CreateTablePosts() {
    openDbLocal().then(db=>{db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
      post_date DATE ,
      description TEXT ,
      likes INTEGER ,
      url_imagem TEXT 
    )
  `)
})

openDbLocal().then(db=>{db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER ,
        user TEXT ,
        comment TEXT ,
        FOREIGN KEY (post_id) REFERENCES posts (id)
    )
  `)
})

}
export async function InsertPost(post: any) {
    openDbLocal().then(db => {
      db.run(`
        INSERT INTO posts (id, user, post_date, description, likes, url_imagem)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [post.id, post.user, post.post_date, post.description, post.likes, post.url_imagem]);
    });
  }

  export async function InsertComment(post: any) {
    openDbLocal().then(db => {
      db.run(`
        INSERT INTO comments (post_id, user, comment)
        VALUES (?, ?, ?)
      `, [post.id, post.user, post.comment]);
    });
  }
// export const savePost = (post: Post) => {
//     PostsData.posts.unshift(post); // adiciona o post no início da array
//     return post;
// }