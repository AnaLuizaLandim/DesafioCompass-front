import { Router } from "express";
import { deleteUserByIdController, getAllUsersController, getUserByIdController, loginController, saveUserController, updateUserByIdController } from "../controller/user-controller";
import { deleteCommentByIdController, deletePostByIdController, getAllCommentController, getAllPostsController, getPostCommentController, saveCommentController, savePostController, updatePostsByIdController } from "../controller/post-controller";
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

AppRoutes.route('/api/v1/posts/:post_id/comments')
.post(saveCommentController)

AppRoutes.route('/api/v1/comments/')
    .get(getAllCommentController)

AppRoutes.route('/api/v1/posts/comments/:id')
.delete(deleteCommentByIdController)

//login
AppRoutes.route('/api/v1/users/login').post(loginController);

