import { Router } from "express";
import { deleteUserByIdController, getAllUsersController, getUserByIdController, loginController, saveUserController, updateUserByIdController } from "../controller/user-controller";
import { deletePostByIdController, getAllCommentController, getAllPostsController, getPostCommentController, savePostController, updatePostsByIdController } from "../controller/post-controller";
import { getPostByIdController } from "../controller/post-controller";
export const AppRoutes = Router();

//rotas de usuarios
AppRoutes.route('/api/v1/users')
    .get(getAllUsersController)
    .post(saveUserController)

AppRoutes.route('/api/v1/users/:id')
    .get(getUserByIdController)
    .delete(deleteUserByIdController)
    .put(updateUserByIdController)


//rotas de posts
AppRoutes.route('/api/v1/posts')
    .get(getAllPostsController)
    .post(savePostController);

AppRoutes.route('/api/v1/posts/:id')
    .get(getPostByIdController)
    .delete(deletePostByIdController)
    .put(updatePostsByIdController)

//rotas de comentarios
AppRoutes.route('/api/v1/posts/:id/comments/:post_id')
    .get(getPostCommentController)
    .delete()
    .post()

AppRoutes.route('/api/v1/comments')
    .get(getAllCommentController)


//login
AppRoutes.route('/login').post(loginController);

