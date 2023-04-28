import { Request, Response } from "express";
import { getAllUsers } from "../service/user-service"

export const getAllUsersController =(req:Request,res:Response<any>)=>{
    const response = getAllUsers();
    res.json(response);
}