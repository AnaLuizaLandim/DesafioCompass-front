import { Post } from "../model/post.model";
import sqlite3 from "sqlite3";
import { Comment } from "../model/post.model";


export const saveComment = async (comment: Comment) => {
  const db = new sqlite3.Database('./database.db');
  const query = `INSERT INTO comments (post_id, user, comment) VALUES (?, ?, ?)`;
  const params = [comment.post_id, comment.user, comment.comment];

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
  let query = 'UPDATE posts SET';
  const params:any = [];
  if (post_date !== undefined) {
    query += ' post_date = ?,';
    params.push(post_date);
  }
  if (description !== undefined) {
    query += ' description = ?,';
    params.push(description);
  }
  if (likes !== undefined) {
    query += ' likes = ?,';
    params.push(likes);
  }
  if (url_imagem !== undefined) {
    query += ' url_imagem = ?,';
    params.push(url_imagem);
  }
  query = query.slice(0, -1);
  query += ' WHERE id = ?';
  params.push(id);

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
  const query = `SELECT * FROM posts ORDER BY post_date DESC`;

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

