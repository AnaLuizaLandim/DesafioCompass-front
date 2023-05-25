import { Request, Response } from "express";
import { deleteCommentById, deletePostById, getAllComments, getAllPosts, getCommentById, getCommentById2, getPostById, saveComment, savePost, updatePostById } from "../service/post-service";
import { Post } from "../model/post.model";
import { Comment } from "../model/post.model";

export const saveCommentController = async (req: Request<Comment>, res: Response<any>) => {
  try {
    const comment: Comment = req.body;

    const savedComment = await saveComment(comment);

    res.json(savedComment);
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao salvar o comentário'
    });
  }
};

export const deleteCommentByIdController = async (req: Request<any>, res: Response<any>) => {
  try {
    const id = Number(req.params.id);

    const comment = await getCommentById2(id);
    if (!comment) {
      res.status(404).json({
        error: 'Comentário não encontrado'
      });
      return;
    }

    await deleteCommentById(id);

    res.json({
      message: 'Comentário excluído com sucesso'
    });
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao excluir o comentário'
    });
  }
};
export const deletePostByIdController = async (req: Request<Post>, res: Response<any>) => {
  try {
    const id = Number(req.params.id);

    const post = await getPostById(id);
    if (!post) {
      res.status(404).json({
        error: 'Post não encontrado'
      });
      return;
    }

    await deletePostById(id);

    res.json({
      message: 'Post excluído com sucesso'
    });
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao excluir o post'
    });
  }
};

export const updatePostsByIdController = async (req: Request<Post>, res: Response<any>) => {
  try {
    const id = Number(req.params.id);
    const updatedFields: Partial<Post> = req.body;

    const post = await getPostById(id);
    if (!post) {
      res.status(404).json({
        error: 'Post não encontrado'
      });
      return;
    }

    const updatedPost = { ...post, ...updatedFields };
    const response = await updatePostById(id, updatedFields);

    res.json(response);
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao atualizar o post'
    });
  }
};



export const getAllPostsController = async (req: Request, res: Response<any>) => {
  try {
    const response = await getAllPosts();
    console.log(response);
    res.json(response);
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao obter os posts'
    });
  }
}


// export const getAllPostsController = (req: Request, res: Response<any>) => {
//     const response = getAllPosts();
//     res.json(response);
// }

// export const savePostController = (req: Request<Post>, res: Response<Post>) => {
//     const response = savePost(req.body);
//     res.json(response);
// }



export const savePostController = async (req: Request<Post>, res: Response<any>) => {
  try {
    const savedPost = await savePost(req.body) as Post; // Conversão de tipo para Post

    const posts: Post[] = await getAllPosts() as Post[]; // Obtenha a lista completa de posts atualizada
    posts.unshift(savedPost); // Adicione o novo post no início da array

    res.json(posts);
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao salvar o post'
    });
  }
};






export const getPostByIdController = async (req: Request, res: Response<any>) => {
  try {
    const id = Number(req.params.id);
    const response = await getPostById(id);
    res.json(response);
  }
  catch (err) {
    res.status(500).json({
      error: 'Id não encontrado'
    })
  }
}

export const getPostCommentController = async (req: Request, res: Response<any>) => {
  try {
    const post_id = Number(req.params.post_id);
    const id = Number(req.params.id);
    console.log(id);
    console.log(post_id);
    const response = await getCommentById(post_id, id);
    res.json(response);
  }
  catch (err) {
    res.status(500).json({
      error: 'Id não encontrado'
    })
  }
}

export const getAllCommentController = async (req: Request, res: Response<any>) => {
  try {
    const response = await getAllComments();
    res.json(response);
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao obter os comentários'
    });
  }
};




