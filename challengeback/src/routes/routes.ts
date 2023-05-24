import { Router } from "express";
import { getAllUsersController, getUserByIdController, loginController } from "../controller/user-controller";
import { getAllCommentController, getAllPostsController, getPostCommentController, savePostController } from "../controller/post-controller";
import { PostsData } from "../constants/posts.constant";
import { getPostByIdController } from "../controller/post-controller";
export const AppRoutes = Router();

//rotas de usuarios
AppRoutes.route('/api/v1/users').get(getAllUsersController);
AppRoutes.route('/api/v1/users/:id')
.get(getUserByIdController);

//rotas de posts
AppRoutes.route('/api/v1/posts')
    .get(getAllPostsController)
    .post(savePostController);
    
AppRoutes.route('/api/v1/posts/:id')
.get(getPostByIdController)

//rotas de comentarios
AppRoutes.route('/api/v1/posts/:id/comments/:post_id')
.get(getPostCommentController)

AppRoutes.route('/api/v1/comments').get(getAllCommentController)

//login
AppRoutes.route('/login').post(loginController);

