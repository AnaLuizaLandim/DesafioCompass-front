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

    await deleteUserById(id);

    res.status(204).json({
      message: 'Usuário excluído com sucesso',
    });
  } catch (err) {
  
      res.status(404).json({
        error: 'Usuário não encontrado'
      });
    
  }
};


export const updateUserByIdController = async (req: Request<User>, res: Response<any>) => {
  try {
    const id = Number(req.params.id);
    const updatedFields: Partial<User> = req.body;

    await updateUserById(id, updatedFields);

    delete updatedFields.password;

    res.json(updatedFields);
  } catch (err) {
    res.status(404).json({
      error: 'Ocorreu um erro ao atualizar o usuário'
    });
  }
};




export const saveUserController = async (req: Request<User>, res: Response<any>) => {
  try {
    const response : any = await saveUser(req.body);

    delete response.password;

    res.json(response);
  } catch (err) {
    res.status(400).json({
      error: 'Erro nas credenciais'
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
  const { email, password } = req.body; 

  login({ email, password })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(401).json({ error: 'Inválido isso ai que tu colocou' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Man se liga ai' });
    });
};




export const getUserByIdController = async (req: Request, res: Response<any>) => {
  try {
    const id = Number(req.params.id);
    const response = await getUserById(id);
    res.json(response);
  } catch (err) {
    res.status(404).json({
      error: 'id não encontrado'
    });
  }
};