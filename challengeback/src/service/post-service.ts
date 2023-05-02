import { PostsData } from "../constants/posts.constant";
import { Post } from "../model/post.model";

export const getAllPosts = () => {
    const data = PostsData.posts;
    data.reverse();
    return data;
}
//postagem
export const savePost = (post: Post) => {
    PostsData.posts.unshift(post); // adiciona o post no início da array
    return post;
}