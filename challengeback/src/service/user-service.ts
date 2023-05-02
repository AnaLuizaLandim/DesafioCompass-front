import { UserData } from "../constants/user-data.constant"

export const getAllUsers =()=>{
    return UserData.users;
}

export const login =(value:{email: string, password: string})=>{
    const userFound = UserData.users.find((item)=>(item.email===value.email))
    if(userFound && userFound.password!==value.password){
        return null;
    }
    return userFound || null    ;
}