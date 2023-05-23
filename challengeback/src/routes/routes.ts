import { Router } from "express";
import { getAllUsersController, loginController } from "../controller/user-controller";
import { getAllPostsController, savePostController } from "../controller/post-controller";
import { PostsData } from "../constants/posts.constant";
import { getPostByIdController } from "../controller/post-controller";
export const AppRoutes = Router();

AppRoutes.route('/api/v1/users').get(getAllUsersController);

AppRoutes.route('/api/v1/users/:id')
.get()



AppRoutes.route('/api/v1/posts')
    .get(getAllPostsController)
    .post(savePostController);
    
AppRoutes.route('/api/v1/posts/:id')
.get(getPostByIdController)


AppRoutes.route('/login').post(loginController);

