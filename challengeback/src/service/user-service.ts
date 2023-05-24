import { UserData } from "../constants/user-data.constant"
import  sqlite3  from "sqlite3";
import { openDbLocal } from "../repository/configdb";

export const getAllUsers =()=>{
    return UserData.users;
}

export const login =(value:{email: string, password: string})=>{
    const userFound = UserData.users.find((item)=>(item.email===value.email))
    if(userFound && userFound.password!==value.password){
        return null;
    }
    return userFound || null    ;
}

export function getUserById(id: number) {
    
    const db = new sqlite3.Database('./database.db')
    const query =(`SELECT * FROM users WHERE id = ? LIMIT 1 OFFSET 0`);
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

