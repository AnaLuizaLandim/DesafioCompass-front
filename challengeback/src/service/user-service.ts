import  sqlite3  from "sqlite3";
import { openDbLocal } from "../repository/configdb";
import { User } from "../model/user.model";

// export const getAllUsers =()=>{
//     return UserData.users;
// }
export function deleteUserById(id: number) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./database.db');
    const query = `DELETE FROM users WHERE id = ?`;
    const params = [id];

    db.run(query, params, function (error) {
      db.close();
      if (error) {
        reject(error);
      } else {
        if (this.changes > 0) {
          resolve({ id });
        } else {
          reject(new Error('User não encontrado'));
        }
      }
    });
  });
}


export function updateUserById(id: number, updatedFields: Partial<User>) {
  const db = new sqlite3.Database('./database.db');
  const { name, birthdate, email, password, profile_photo, user } = updatedFields;
  let query = 'UPDATE users SET ';
  const params:any = [];

  if (name !== undefined) {
    query += 'name = ?, ';
    params.push(name);
  }
  if (birthdate !== undefined) {
    query += 'birthdate = ?, ';
    params.push(birthdate);
  }
  if (email !== undefined) {
    query += 'email = ?, ';
    params.push(email);
  }
  if (password !== undefined) {
    query += 'password = ?, ';
    params.push(password);
  }
  if (profile_photo !== undefined) {
    query += 'profile_photo = ?, ';
    params.push(profile_photo);
  }
  if (user !== undefined) {
    query += 'user = ?, ';
    params.push(user);
  }

  query = query.slice(0, -2) + ' WHERE id = ?';
  params.push(id);

  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      db.close();
      if (error) {
        reject(error);
      } else {
        if (this.changes > 0) {
          delete updatedFields.password;

          resolve({ id, ...updatedFields });
        } else {
          reject(new Error('Usuário não encontrado'));
        }
      }
    });
  });
}




export const saveUser = async (user: User) => {
  const db = new sqlite3.Database('./database.db');
  const query = `INSERT INTO users (name, user, birthdate, email, password, profile_photo) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user.name, user.user, user.birthdate, user.email, user.password, user.profile_photo];

  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      db.close();
      if (error) {
        reject(error);
      } else {
        const userId = this.lastID;
        const getUserQuery = `SELECT id, name, user, birthdate, email, profile_photo FROM users WHERE id = ?`;
        const getUserParams = [userId];

        db.get(getUserQuery, getUserParams, (error, row) => {
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

export function getAllUsers() {
    const db = new sqlite3.Database('./database.db');
    const query = `SELECT * FROM users`;
  
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

export const login = (value: { email: string, password: string }) => {
  const db = new sqlite3.Database('./database.db');
  const query = `SELECT * FROM users WHERE email = ? and password = ?`;

  return new Promise((resolve, reject) => {
    db.get(query, [value.email, value.password], (error, row) => {
      db.close();
      if (error) {
        reject(error);
      } else {
        if (row && row.password === value.password) {
          resolve(row);
        } else {
          resolve(null);
        }
      }
    });
  });
};



// export const login =(value:{email: string, password: string})=>{
//     const userFound = UserData.users.find((item)=>(item.email===value.email))
//     if(userFound && userFound.password!==value.password){
//         return null;
//     }
//     return userFound || null    ;
// }
export function getUserById(id: number) {
  const db = new sqlite3.Database('./database.db');
  const query = `SELECT id, name, user, birthdate, email, profile_photo FROM users WHERE id = ? LIMIT 1 OFFSET 0`;

  return new Promise((resolve, reject) => {
    db.get(query, [id], (error, row) => {
      db.close();
      if (error) {
        reject(error);
      } else {
        if (row) {
          resolve(row);
        } else {
          reject(new Error('Usuário não encontrado'));
        }
      }
    });
  });
}

export default async function CreateTableUsers() {
    openDbLocal().then(db=>{db.exec(`
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

export async function InsertUser(user: any) {
    openDbLocal().then(db => {
        db.run(
          `
          INSERT INTO users (id, name, user, birthdate, email, password, profile_photo)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          `,
          [user.id, user.name, user.user, user.birthdate, user.email, user.password, user.profile_photo]
        );
      });
    }
  