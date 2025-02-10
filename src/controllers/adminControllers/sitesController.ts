import { RequestHandler, Response, Request } from "express";
import * as sites from '../../services/sites';
import * as user from '../../services/user';

import { z } from "zod";
import * as section from '../../services/sections';
import {Temas} from '../../types/Sections';
import { decodedJWT } from "../../services/auth";
import { User } from "../../types/User";
type userJwt = {
    id: number;
    email: string;
    name: string;
    premium: boolean;
} | false;

export const createSite: RequestHandler = async(req, res) =>{
    const id = req.params.id;
    const token: User = await decodedJWT(req.headers.authorization as string) as User;
    if(id && token && token.id == parseInt(id)){
        const siteSchema = z.object({
            title: z.string(),
            keywords: z.string(),
            description: z.string(),
            favicon: z.string(),
            type: z.string(),
        })
        const body = siteSchema.safeParse(req.body);
        if(!body.success){
            res.json({error: 'Dados inválidos'});
            return;
        }
        const formattedName = body.data.title.replace(/\s+/g, "-").toLowerCase();
        if(req.headers.authorization){
            const userPremium = await user.getOne({id: token.id, email: token.email});
            if(userPremium && userPremium.plan == 'BASIC' || userPremium && userPremium.plan == 'PREMIUM'){
                let sitesTotal = await sites.getAll({userId: token.id});
                if(sitesTotal){
                    if(sitesTotal.length >= 1 && userPremium.plan == 'BASIC'){
                        res.json({error: 'Você atingiu o limite de sites que pode criar no plano BASIC'});
                        return;
                    }
                    if(sitesTotal.length >= 5 && userPremium.plan == 'PREMIUM'){
                        res.json({error: 'Você atingiu o limite de sites que pode criar no plano PREMIUM'});
                        return;
                    }
                }

                const newSite = await sites.create({
                    userId: parseInt(id),
                    title: formattedName as string,
                    description: body.data.description,
                    keywords: body.data.keywords,
                    favicon: body.data.favicon,
                    type: body.data.type,
                });
                if(newSite) {
                        //CRIAR SESSÕES BASICAS
                    let newSectionsBase = await createSectionBases(newSite.id, body.data.type)
                    if(newSectionsBase){
                        res.status(201).json({newSite});
                        return;
                    }
                        
                } 
                
            }else{
                res.json({error: 'Assine algum plano para poder criar sites'});
                return;
            }
            
        }
        
    }
    
    res.json({error: 'Algo deu errado - (mude o title e tente novamente)'});
    return;
}
export const editSite: RequestHandler = async(req, res) =>{
    const id = req.params.id;
    const id_user = req.params.id_user;
    const token: User = await decodedJWT(req.headers.authorization as string) as User;
    
    if(id && id_user && token && token.id == parseInt(id_user)){
        const editSiteSchema = z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            favicon: z.string().optional(),
        });
        const body = editSiteSchema.safeParse(req.body);
        if(!body.success){
            res.json({error: 'Dados inválidos'});
            return;
        }
        const formattedName = body.data.title?.replace(/\s+/g, "-").toLowerCase();
        let filter = {
            id: parseInt(id),
            userId: parseInt(id_user),
        }
        let data = {
            title: formattedName,
            description: body.data.description,
            favicon: body.data.favicon
        }
        const updatedSite = await sites.update(filter, data);
            
        if(updatedSite){
            res.status(200).json({updatedSite});
            return;
        }
    }else{
        res.json({error: 'Você não tem permissão para editar esse site'});
        return;
    }
    
    res.json({error: 'algo deu errado'});
    return;
}

export const getSitesByUserId:RequestHandler = async(req, res) =>{
    const id_user = req.params.id_user;
    const token: User = await decodedJWT(req.headers.authorization as string) as User;
    if(id_user && token && token.id == parseInt(id_user as string)){
        const sitesByUserId = await sites.getAll({userId: parseInt(id_user)});
        if(sitesByUserId){
            res.json({sitesByUserId});
            return;
        }
    }else{
        res.json({error: 'Você não tem permissão para acessar essas informações'});
        return;
    }

    res.json({error: 'algo deu errado'});
    return;
}

export const getSiteByUserIdAndSiteId: RequestHandler = async(req, res) =>{
    const {id_user, id} = req.params;
    const token: User = await decodedJWT(req.headers.authorization as string) as User;
    if(id && id_user && token && token.id == parseInt(id_user)){
        const siteByUserIdAndSiteId = await sites.getAll({userId: parseInt(id_user), id: parseInt(id)});
        if(siteByUserIdAndSiteId){
            res.json({siteByUserIdAndSiteId});
            return;
        }
    }
}

export const deleteSite: RequestHandler = async(req, res) =>{
    const {id_user, id} = req.params;
    const token: User = await decodedJWT(req.headers.authorization as string) as User;
    if(id && id_user && token && token.id == parseInt(id_user)){
        const deletedSite = await sites.remove({id: parseInt(id), userId: parseInt(id_user)});
        if(deletedSite){
            res.status(200).json({deletedSite});
            return;
        }
    }

    res.json({error: 'algo deu errado'});
    return;
}
type objectTheme = {
    [key: string]: any;
    type: string;
}
const createSectionBases = async(siteId: number, type: string) =>{
    if(siteId){
        const theme: objectTheme[] = Temas[type] as objectTheme[];
        for(let i = 0; i < theme.length; i++){
            const dataAtual = theme[i];
            
            if(dataAtual && dataAtual.type){
                let newSection = await section.create({
                    siteId,
                    type: dataAtual.type,
                    order: i,
                    content: dataAtual
                });
                if(!newSection){
                    return false;
                }
            }
        }
    }
    return true
}