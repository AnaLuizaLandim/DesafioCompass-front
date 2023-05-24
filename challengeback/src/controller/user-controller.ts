import { Request, Response } from "express";
import { getAllUsers, getUserById, login } from "../service/user-service"
import { openDbLocal } from "../repository/configdb";
import  sqlite3  from "sqlite3";

export const getAllUsersController =(req:Request,res:Response<any>)=>{
    const response = getAllUsers();
    res.json(response);
}

export const loginController =(req:Request<{email:string, password:string}>,res:Response<any>)=>{
    const response = login(req.body);
    res.json(response);
}

export const getUserByIdController = async (req: Request, res: Response<any>)=> {
    try{
       const id = Number(req.params.id);
       const response = await getUserById(id);
       res.json(response);
    }
    catch(err){
       res.status(500).json({
           error: 'Id não encontrado'
       })
    }
}