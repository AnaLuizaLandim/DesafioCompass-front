import { Request, Response } from "express";
import { getAllPosts, savePost } from "../service/post-service";
import { Post } from "../model/post.model";

export const getAllPostsController = (req: Request, res: Response<any>) => {
    const response = getAllPosts();
    res.json(response);
}

export const savePostController = (req: Request<Post>, res: Response<Post>) => {
    const response = savePost(req.body);
    res.json(response);
}