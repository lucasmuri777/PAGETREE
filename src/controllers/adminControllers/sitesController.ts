import { RequestHandler, Response, Request } from "express";
import * as sites from '../../services/sites';
import { z } from "zod";



export const createSite: RequestHandler = async(req, res) =>{
    const id = req.params.id;
    if(id){
        const siteSchema = z.object({
            title: z.string(),
            keywords: z.string(),
            description: z.string(),
            favicon: z.string(),
        })
        const body = siteSchema.safeParse(req.body);
        if(!body.success){
            res.json({error: 'Dados inválidos'});
            return;
        }
        const formattedName = body.data.title.replace(/\s+/g, "-");
    
        const newSite = await sites.create({
            userId: parseInt(id),
            title: formattedName as string,
            description: body.data.description,
            keywords: body.data.keywords,
            favicon: body.data.favicon,
        });
        if(newSite) {
            res.status(201).json({newSite});
            return;
        }    
    }
    
    res.json({error: 'Algo deu errado'});
    return;
}
export const editSite: RequestHandler = async(req, res) =>{
    const id = req.params.id;
    const id_user = req.params.id_user;
    if(id && id_user){
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
        const formattedName = body.data.title?.replace(/\s+/g, "-");
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
    }
    
    res.json({error: 'algo deu errado'});
    return;
}

export const getSitesByUserId:RequestHandler = async(req, res) =>{
    const id_user = req.params.id_user;
    if(id_user){
        const sitesByUserId = await sites.getAll({userId: parseInt(id_user)});
        if(sitesByUserId){
            res.json({sitesByUserId});
            return;
        }
    }

    res.json({error: 'algo deu errado'});
    return;
}

export const deleteSite: RequestHandler = async(req, res) =>{
    const {id_user, id} = req.params;
    if(id && id_user){
        const deletedSite = await sites.remove({id: parseInt(id), userId: parseInt(id_user)});
        if(deletedSite){
            res.status(200).json({deletedSite});
            return;
        }
    }

    res.json({error: 'algo deu errado'});
    return;
}