import { Request, Response } from "express";
import { deletePostById, getAllComments, getAllPosts, getCommentById, getPostById, savePost, updatePostById } from "../service/post-service";
import { Post } from "../model/post.model";

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
      error: 'Erro ao obter os usuarios'
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
    const response = await savePost(req.body);
    res.json(response);
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




