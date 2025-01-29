import { RequestHandler } from "express";
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';
import { User } from "../types/User";
import {checkUserExist} from '../utils/checkUserExist';

dotenv.config();
export const auth: RequestHandler = async(req, res, next) =>{
    let sucess = false;
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        // validate token here
        try{
            const decoded = await JWT.verify(
                token,
                process.env.SECRET_API_BACK_JWT as string,
            ) as User;
           if(decoded){
                sucess = true;
            }
            
        }catch(err){
            console.log(err);
        }
    }
    if(sucess){
        next();
        return;
    }else{
        res.status(403).json({error: 'Unauthorized'});
        return;
    }
}


export const decodedJWT = async(token: string) =>{
    const tokenVal = token.split(' ')[1];
    try{
        const decoded = await JWT.verify(
            tokenVal,
            process.env.SECRET_API_BACK_JWT as string,
        ) as User;
        return decoded ? decoded : false;
    }catch(err){
        console.log(err);
        return false;
    }
}