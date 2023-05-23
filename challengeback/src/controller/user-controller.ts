import { Request, Response } from "express";
import { getAllUsers, login } from "../service/user-service"
import { openDbLocal } from "../repository/configdb";

export const getAllUsersController =(req:Request,res:Response<any>)=>{
    const response = getAllUsers();
    res.json(response);
}

export const loginController =(req:Request<{email:string, password:string}>,res:Response<any>)=>{
    const response = login(req.body);
    res.json(response);
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

