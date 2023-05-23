import { Request, Response } from "express";
import { getAllPosts, savePost } from "../service/post-service";
import { Post } from "../model/post.model";
import { openDb } from "../repository/configdb";


export const getAllPostsController = (req: Request, res: Response<any>) => {
    const response = getAllPosts();
    res.json(response);
}

export const savePostController = (req: Request<Post>, res: Response<Post>) => {
    const response = savePost(req.body);
    res.json(response);
}


export default async function CreateTablePosts() {
    openDb().then(db=>{db.exec(`
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

openDb().then(db=>{db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER ,
        user TEXT ,
        comment TEXT ,
        FOREIGN KEY (post_id) REFERENCES posts (id)
    )
  `)
})

openDb().then(db=>{db.exec(`
    CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            user TEXT,
            birthdate DATE,
            email TEXT,
            password TEXT,
            profile_photo TEXT
    )
  `)
})
}
export async function InsertPost(post: any) {
    openDb().then(db => {
      db.run(`
        INSERT INTO posts (id, user, post_date, description, likes, url_imagem)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [post.id, post.user, post.post_date, post.description, post.likes, post.url_imagem]);
    });
  }

  export async function InsertComment(post: any) {
    openDb().then(db => {
      db.run(`
        INSERT INTO comments (post_id, user, comment)
        VALUES (?, ?, ?)
      `, [post.id, post.user, post.comment]);
    });
  }
  


