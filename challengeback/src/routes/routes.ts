import { Router } from "express";
import { getAllUsersController, loginController } from "../controller/user-controller";
import { getAllPostsController, savePostController } from "../controller/post-controller";

export const AppRoutes = Router();

AppRoutes.route('/api/v1/users').get(getAllUsersController);
AppRoutes.route('/api/v1/posts')
    .get(getAllPostsController)
    .post(savePostController);
AppRoutes.route('/login').post(loginController);

