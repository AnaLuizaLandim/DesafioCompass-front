import { Request, Response } from "express";
import { deleteUserById, getAllUsers, getUserById, login, saveUser, updateUserById } from "../service/user-service"
import { User } from "../model/user.model";

// export const getAllUsersController =(req:Request,res:Response<any>)=>{
//     const response = getAllUsers();
//     res.json(response);
// }



export const deleteUserByIdController = async (req: Request<User>, res: Response<any>) => {
  try {
    const id = Number(req.params.id);
    console.log(id);
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({
        error: 'User não encontrado'
      });
      return;
    }

    await deleteUserById(id);

    res.json({
      message: 'User excluído com sucesso'
    });
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao excluir o user'
    });
  }
};

export const updateUserByIdController = async (req: Request<User>, res: Response<any>) => {
  try {
    const id = Number(req.params.id);
    const updatedFields: Partial<User> = req.body;

    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({
        error: 'Usuário não encontrado'
      });
      return;
    }

    const updatedUser = { ...user, ...updatedFields };
    const response = await updateUserById(id, updatedFields);


    res.json(response);
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao atualizar o usuário'
    });
  }
};


export const saveUserController = async (req: Request<User>, res: Response<any>) => {
  try {
    const response = await saveUser(req.body);
    res.json(response);
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao salvar o User'
    });
  }
};

export const getAllUsersController = async (req: Request, res: Response<any>) => {
  try {
    const response = await getAllUsers();
    console.log(response);
    res.json(response);
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao obter os usuarios'
    });
  }
}
export const loginController = (req: Request<{ email: string, password: string }>, res: Response<any>) => {
  const response = login(req.body);
  res.json(response);
}

export const getUserByIdController = async (req: Request, res: Response<any>) => {
  try {
    const id = Number(req.params.id);
    const response = await getUserById(id);
    res.json(response);
  }
  catch (err) {
    res.status(500).json({
      error: 'Id não encontrado'
    })
  }
}