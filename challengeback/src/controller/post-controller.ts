import { Request, Response } from "express";
import { getAllPosts, getPostById, savePost } from "../service/post-service";
import { Post } from "../model/post.model";
import { openDbLocal } from "../repository/configdb";


export const getAllPostsController = (req: Request, res: Response<any>) => {
    const response = getAllPosts();
    res.json(response);
}

export const savePostController = (req: Request<Post>, res: Response<Post>) => {
    const response = savePost(req.body);
    res.json(response);
}

export const getPostByIdController = async (req: Request, res: Response<any>)=> {
 try{
    const id = Number(req.params.id);
    const response = await getPostById(id);
    res.json(response);
 }
 catch(err){
    res.status(500).json({
        error: 'Id não encontrado'
    })
 }
}


  


