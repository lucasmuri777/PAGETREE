import * as users from '../services/user';
import { User } from '../types/User';

export const checkUserExist = async(data: User) =>{
    const user = await users.getOne({email: data.email});
    if(!user){
        const newUser = await users.add(data);
        if(newUser){
            return newUser;
        }
        return false;
    }

    return user;
}