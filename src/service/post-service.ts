import { PostsData } from "../constants/posts.constant";
import { Post } from "../model/post.model";

export const getAllPosts = () => {
    return PostsData.posts;
}
//postagem
export const savePost = (post: Post) => {
    PostsData.posts.push(post);
    return post;
}