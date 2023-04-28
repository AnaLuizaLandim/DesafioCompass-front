import { Router } from "express";
import { getAllUsersController } from "../controller/user-controller";
import { getAllPostsController, savePostController } from "../controller/post-controller";

export const AppRoutes = Router();

AppRoutes.route('/user').get(getAllUsersController);
AppRoutes.route('/post')
    .get(getAllPostsController)
    .post(savePostController);

