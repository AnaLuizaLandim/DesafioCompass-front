import { Post } from "../model/post.model";
import { openDbLocal } from "../repository/configdb";
import sqlite3 from "sqlite3";
import { Comment } from "../model/post.model";

// export const getAllPosts = () => {
//     const data = PostsData.posts;
//     return data;
// }
export const saveComment = async (comment: Comment) => {
  const db = new sqlite3.Database('./database.db');
  const query = `INSERT INTO comments (post_id, user, comment) VALUES (?, ?, ?)`;
  const params = [comment.user, comment.comment, comment.post_id];

  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      db.close();
      if (error) {
        reject(error);
      } else {
        const commentId = this.lastID;
        const getCommentQuery = `SELECT * FROM comments WHERE id = ?`;
        const getCommentParams = [commentId];

        db.get(getCommentQuery, getCommentParams, (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve(row);
          }
        });
      }
    });
  });
};
export function deleteCommentById(id: number) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./database.db');
    const query = `DELETE FROM comments WHERE id = ?`;
    const params = [id];

    db.run(query, params, function (error) {
      db.close();
      if (error) {
        reject(error);
      } else {
        if (this.changes > 0) {
          resolve({ id });
        } else {
          reject(new Error('Comentário não encontrado'));
        }
      }
    });
  });
}

export function deletePostById(id: number) {
  const db = new sqlite3.Database('./database.db');
  const query = `DELETE FROM posts WHERE id = ?`;
  const params = [id];
  
  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      db.close();
      if (error) {
        reject(error);
      } else {
        if (this.changes > 0) {
          resolve({ id });
        } else {
          reject(new Error('Post não encontrado'));
        }
      }
    });
  });
}

export function updatePostById(id: number, updatedFields: Partial<Post>) {
  const db = new sqlite3.Database('./database.db');
  const { post_date, description, likes, url_imagem } = updatedFields;
  const query = `UPDATE posts SET post_date = ?, description = ?, likes = ?, url_imagem = ? WHERE id = ?`;
  const params = [post_date, description, likes, url_imagem, id];
  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      db.close();
      if (error) {
        reject(error);
      } else {
        if (this.changes > 0) {
          resolve({ id, ...updatedFields });
        } else {
          reject(new Error('Post não encontrado'));
        }
      }
    });
  });
}


export function getAllPosts() {
  const db = new sqlite3.Database('./database.db');
  const query = `SELECT * FROM posts`;

  return new Promise((resolve, reject) => {
    db.all(query, (error, rows) => {
      db.close();
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}
//postagem
// export const savePost = (post: Post) => {
//     PostsData.posts = [post, ...PostsData.posts]; 
//     return post;
// }

export const savePost = async (post: Post) => {
  const db = new sqlite3.Database('./database.db');
  const query = `INSERT INTO posts (user, post_date, description, likes, url_imagem) VALUES (?, ?, ?, ?, ?)`;
  const params = [post.user, post.post_date, post.description, post.likes, post.url_imagem];

  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      db.close();
      if (error) {
        reject(error);
      } else {
        const postId = this.lastID;
        const getPostQuery = `SELECT * FROM posts WHERE id = ?`;
        const getPostParams = [postId];

        db.get(getPostQuery, getPostParams, (error, row) => {
          if (error) {
            reject(error);
          } else {
            const newPost = {
              id: row.id,
              user: row.user,
              post_date: row.post_date,
              description: row.description,
              likes: row.likes,
              url_imagem: row.url_imagem,
              comments: []
            };

            db.all('SELECT * FROM posts', (error, rows) => {
              if (error) {
                reject(error);
              } else {
                const updatedPosts = [newPost, ...rows];
                resolve(updatedPosts);
              }
            });
          }
        });
      }
    });
  });
};


export function getPostById(id: number) {

  const db = new sqlite3.Database('./database.db')
  const query = (`SELECT * FROM posts WHERE id = ? LIMIT 1 OFFSET 0`);
  return new Promise((resolve, reg) => {
    db.get(query, [id], (error, row) => {
      db.close();
      if (error) {
        reg(error);
      }
      else {
        resolve(row);
      }
    })
  })
}

export function getCommentById(id: number, post_id: number) {
  const db = new sqlite3.Database('./database.db');
  const query = `SELECT * FROM comments WHERE id = ? AND post_id = ?`;

  return new Promise((resolve, reject) => {
    db.get(query, [id, post_id], (error, row) => {
      db.close();
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

export function getCommentById2(id: number) {
  const db = new sqlite3.Database('./database.db');
  const query = `SELECT * FROM comments WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.get(query, [id], (error, row) => {
      db.close();
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}
export function getAllComments() {
  const db = new sqlite3.Database('./database.db');
  const query = `SELECT * FROM comments`;

  return new Promise((resolve, reject) => {
    db.all(query, (error, rows) => {
      db.close();
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}


export default async function CreateTablePosts() {
  openDbLocal().then(db => {
    db.exec(`
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

  openDbLocal().then(db => {
    db.exec(`
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