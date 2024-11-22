import { RequestHandler } from "express";
import * as users from '../../services/user';
import JWT from 'jsonwebtoken';
import {checkUserExist} from '../../utils/checkUserExist';
import { User } from "../../types/User";


export const login: RequestHandler = async(req, res) =>{
    const user = req.body.user;
    if(user){
        try{
            const decoded = JWT.verify(
                user,
                process.env.SECRET_API_FRONT_JWT as string,
            ) as User;
            if(decoded){
                let hasUser = await checkUserExist(decoded);
                if(hasUser){
                    const token = JWT.sign(hasUser, 
                        process.env.SECRET_API_BACK_JWT as string,
                        { expiresIn: '7d' }
                    );
                    res.json({
                        token,
                        user: hasUser,
                    });
                    return;
                }
            }
        }catch(err){
            console.log(err);
        }
    }

    res.json({error: 'Algo deu errado'});
    return;
}