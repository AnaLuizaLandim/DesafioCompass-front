import { Request, Response } from "express";
import { getAllPosts, getCommentById, getPostById, savePost } from "../service/post-service";
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

export const getPostCommentController = async (req: Request, res: Response<any>)=> {
    try{
        const post_id = Number(req.params.post_id);
        const id = Number(req.params.id);
        console.log(id);
        console.log(post_id);
       const response = await getCommentById(post_id, id);
       res.json(response);
    }
    catch(err){
       res.status(500).json({
           error: 'Id não encontrado'
       })
    }
   }
  


