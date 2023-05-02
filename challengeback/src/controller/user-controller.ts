import { Request, Response } from "express";
import { getAllUsers, login } from "../service/user-service"

export const getAllUsersController =(req:Request,res:Response<any>)=>{
    const response = getAllUsers();
    res.json(response);
}

export const loginController =(req:Request<{email:string, password:string}>,res:Response<any>)=>{
    const response = login(req.body);
    res.json(response);
}